import React, { FC, useMemo } from 'react';
import {
  Button,
  CheckBox,
  Input,
  Select,
  Typography,
  useCheckBoxValue,
  useInputValue,
  useSelectIndex,
} from '../../../../.storybook/stories';
import { selectDevicesWithType } from '../../../../redux/devicesSlice';
import { useAppSelector } from '../../../../redux/hooks';
import {
  DeviceType,
  DeviceViewRouteParams,
  FanSchedule,
} from '../../../../types';
import { useSendAPIRequest } from '../../../../hooks';

type TurnOnFanSelectProps = {
  fanBaseParams: DeviceViewRouteParams;
  fanSchedule?: FanSchedule;
};

export const TurnOnFanSelect: FC<TurnOnFanSelectProps> = ({
  fanBaseParams,
  fanSchedule,
}) => {
  const [isFanTurnOnAutomatically, onToggle] = useCheckBoxValue(
    Object.keys(fanSchedule || []).length !== 0,
  );
  const [tempValue, onChangeTempValue] = useInputValue(fanSchedule?.V_TEMP);
  const [selectedIndex, onSelect] = useSelectIndex();

  const sendAPIRequest = useSendAPIRequest();

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
        ...tempSensorsIds[selectedIndex].value,
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
      <CheckBox
        checked={isFanTurnOnAutomatically}
        onPress={onCheckboxPress}
        label="Włączaj automatycznie wentylator, jeżeli temperatura na określonym czujniku będzie miała wybraną wartość"
      />
      {isFanTurnOnAutomatically && (
        <>
          <Typography
            text="Wybierz czujnik temperatury, który aktywuje wentylator:"
            variant="body-medium"
          />
          <Select
            selectData={tempSensorsIds}
            index={selectedIndex}
            onSelect={onSelect}
          />
          <Typography
            text="Włącz jeżeli temperatura wzrośnie do:"
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
