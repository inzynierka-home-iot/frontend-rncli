import React, { FC, useMemo } from 'react';
import {
  Button,
  CheckBox,
  Select,
  Typography,
  useCheckBoxValue,
  useSelectIndex,
} from '../../../../.storybook/stories';
import { selectDevicesWithType } from '../../../../redux/devicesSlice';
import { useAppSelector } from '../../../../redux/hooks';
import {
  DeviceType,
  BuzzerSchedule,
  DeviceViewRouteParams,
} from '../../../../types';
import { useSendAPIRequest } from '../../../../hooks';

type TurnOnBuzzerSelectProps = {
  buzzerBaseParams: DeviceViewRouteParams;
  buzzerSchedule?: BuzzerSchedule;
};

export const TurnOnBuzzerSelect: FC<TurnOnBuzzerSelectProps> = ({
  buzzerBaseParams,
  buzzerSchedule,
}) => {
  const [isBuzzerTurnOnAutomatically, onToggle] = useCheckBoxValue(
    Object.keys(buzzerSchedule || []).length !== 0,
  );
  const [selectedIndex, onSelect] = useSelectIndex();

  const sendAPIRequest = useSendAPIRequest();

  const motionSensors = useAppSelector(state =>
    selectDevicesWithType(state, DeviceType.S_MOTION),
  );

  const motionSensorsIds = useMemo(
    () =>
      motionSensors.map(motionSensor => ({
        display: motionSensor.name,
        value: {
          location: motionSensor.location,
          nodeId: motionSensor.nodeId,
          id: motionSensor.id,
        },
      })),
    [motionSensors],
  );

  const onTurnOnBuzzerAutomatically = () => {
    sendAPIRequest({
      ...buzzerBaseParams,
      action: 'setSchedule',
      additionalParams: {
        action: 'motionAlarm',
        ...motionSensorsIds[selectedIndex].value,
      },
    });
  };

  const onCheckboxPress = () => {
    if (isBuzzerTurnOnAutomatically) {
      sendAPIRequest({
        ...buzzerBaseParams,
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
        checked={isBuzzerTurnOnAutomatically}
        onPress={onCheckboxPress}
        label="Włączaj automatycznie alarm, jeżeli czujnik wykryje ruch"
      />
      {isBuzzerTurnOnAutomatically && (
        <>
          <Typography
            text="Wybierz czujnik ruchu, który aktywuje alarm:"
            variant="body-medium"
          />
          <Select
            selectData={motionSensorsIds}
            index={selectedIndex}
            onSelect={onSelect}
          />
          <Button text="Włącz" onPress={onTurnOnBuzzerAutomatically} />
        </>
      )}
    </>
  );
};
