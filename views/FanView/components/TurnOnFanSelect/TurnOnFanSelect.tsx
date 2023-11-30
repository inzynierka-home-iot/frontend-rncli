import React, { FC, useMemo } from 'react';
import {
  Button,
  Checkbox,
  Input,
  Select,
  Typography,
  useCheckboxValue,
  useInputValue,
  useSelectValue,
} from '../../../../.storybook/stories';
import { selectDevicesWithType } from '../../../../redux/devicesSlice';
import { useAppSelector } from '../../../../redux/hooks';
import { DeviceType, FanSchedule } from '../../../../types';
import { sendAPIRequest } from '../../../../utils';

type TurnOnFanSelectProps = {
  fanBaseParams: any;
  fanSchedule?: FanSchedule;
};

export const TurnOnFanSelect: FC<TurnOnFanSelectProps> = ({
  fanBaseParams,
  fanSchedule,
}) => {
  const [isFanTurnOnAutomatically, onToggle] = useCheckboxValue(
    Object.keys(fanSchedule || []).length !== 0,
  );
  const [tempValue, onChangeTempValue] = useInputValue(fanSchedule?.V_TEMP);
  const [selectedValue, onSelect] = useSelectValue();

  const tempSensors = useAppSelector(state =>
    selectDevicesWithType(state, DeviceType.S_TEMP),
  );

  const tempSensorsIds = useMemo(
    () =>
      tempSensors.map(tempSensor => ({
        display: tempSensor.name,
        value: {
          location: tempSensor.location,
          nodeId: tempSensor.nodeId,
          id: tempSensor.id,
        },
      })),
    [tempSensors],
  );

  const onTurnOnFanAutomatically = () => {
    sendAPIRequest({
      ...fanBaseParams,
      action: 'setSchedule',
      additionalParams: {
        action: 'maintain',
        ...tempSensorsIds[selectedValue].value,
        V_TEMP: tempValue,
      },
    });
  };

  const onCheckboxPress = () => {
    if (isFanTurnOnAutomatically) {
      sendAPIRequest({
        ...fanBaseParams,
        action: 'setSchedule',
        additionalParams: {
          action: 'remove',
        },
      });
    }
    onToggle();
  };

  return (
    <>
      <Checkbox
        checked={isFanTurnOnAutomatically}
        onPress={onCheckboxPress}
        label="Włączaj automatycznie wentylator, jezeli temperatura na określonym czujniku będzie miała wybraną wartość"
      />
      {isFanTurnOnAutomatically && (
        <>
          <Typography
            text="Wybierz czujnik temperatury, który aktywuje wentylator:"
            variant="body-medium"
          />
          <Select
            selectData={tempSensorsIds}
            index={selectedValue}
            onSelect={onSelect}
          />
          <Typography
            text="Włącz jezeli temperatura wzrośnie do:"
            variant="body-medium"
          />
          <Input
            keyboardType="numeric"
            text={tempValue}
            onChange={onChangeTempValue}
          />
          <Button text="Włącz" onPress={onTurnOnFanAutomatically} />
        </>
      )}
    </>
  );
};
