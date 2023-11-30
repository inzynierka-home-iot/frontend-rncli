import { FC, useMemo, useState } from 'react';
import React from 'react-native';
import {
  Button,
  Checkbox,
  ScheduleDatePicker,
  useCheckboxValue,
} from '../../../../.storybook/stories';
import { useSendAPIRequest } from '../../../../hooks';
import { DeviceViewRouteParams, TempSensorSchedule } from '../../../../types';

type TempRepeatSchedulerProps = {
  tempSensorParams: DeviceViewRouteParams;
  tempSensorSchedule: TempSensorSchedule | undefined;
};

export const TempRepeatScheduler: FC<TempRepeatSchedulerProps> = ({
  tempSensorParams,
  tempSensorSchedule,
}) => {
  const initialSchedule = useMemo(
    () => ({
      hours: parseInt(tempSensorSchedule?.hours ?? '12', 10),
      minutes: parseInt(tempSensorSchedule?.minutes ?? '0', 10),
      days:
        tempSensorSchedule?.days?.split(',').map(day => parseInt(day, 10)) ||
        [],
    }),
    [tempSensorSchedule],
  );

  const [isScheduleRepeat, onToggleScheduleRepeat] = useCheckboxValue(
    Object.keys(tempSensorSchedule || []).length !== 0,
  );
  const [schedule, setSchedule] = useState(initialSchedule);

  const sendAPIRequest = useSendAPIRequest();

  const onSetScheduleRepeat = () => {
    sendAPIRequest({
      ...tempSensorParams,
      action: 'setSchedule',
      additionalParams: {
        action: 'getTemp',
        ...schedule,
      },
    });
  };

  const onCheckboxPress = () => {
    if (isScheduleRepeat) {
      sendAPIRequest({
        ...tempSensorParams,
        action: 'setSchedule',
        additionalParams: {
          action: 'remove',
        },
      });
    }
    onToggleScheduleRepeat();
  };

  return (
    <>
      <Checkbox
        checked={isScheduleRepeat}
        onPress={onCheckboxPress}
        label="Pobieraj temperaturę o określonej godzinie"
      />
      {isScheduleRepeat && (
        <>
          <ScheduleDatePicker
            mode="repeat"
            schedule={schedule}
            onChange={setSchedule}
          />
          <Button text="Ustaw wartość" onPress={onSetScheduleRepeat} />
        </>
      )}
    </>
  );
};
