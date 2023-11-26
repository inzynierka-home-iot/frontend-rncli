import { FC, useMemo, useState } from 'react';
import React from 'react-native';
import {
  Button,
  Checkbox,
  ScheduleDatePicker,
  ScheduleDateValue,
  useCheckboxValue,
} from '../../../../.storybook/stories';
import { useSendAPIRequest } from '../../../../hooks';
import { TempSensorSchedule } from '../../../../types';
import { TempSensorBaseParams } from '../../TempSensorView';

type TempRepeatSchedulerProps = {
  tempSensorParams: TempSensorBaseParams;
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
    !!tempSensorSchedule,
  );
  const [schedule, setSchedule] = useState(initialSchedule);

  const sendAPIRequest = useSendAPIRequest();

  const onSetScheduleRepeat = () => {
    sendAPIRequest({
      ...tempSensorParams,
      action: 'setSchedule',
      additionalParams: {
        ...schedule,
        action: 'getTemp',
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
