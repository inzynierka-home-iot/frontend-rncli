import { FC } from 'react';
import React from 'react-native';
import {
  Checkbox,
  ScheduleDatePicker,
  ScheduleDateValue,
  useCheckboxValue,
} from '../../../../.storybook/stories';
import { sendAPIRequest } from '../../../../utils';
import { TempSensorBaseParams } from '../../TempSensorView';

type TempTimeSchedulerProps = {
  tempSensorParams: TempSensorBaseParams;
};

export const TempTimeScheduler: FC<TempTimeSchedulerProps> = ({
  tempSensorParams,
}) => {
  const [isScheduleTime, onToggleScheduleTime] = useCheckboxValue();

  const handleSetScheduleTime = (value: ScheduleDateValue) => {
    const { hours, minutes } = value;
    sendAPIRequest({
      ...tempSensorParams,
      action: 'scheduleRepeat',
      additionalParams: {
        hours,
        minutes,
      },
    });
  };

  return (
    <>
      <Checkbox
        checked={isScheduleTime}
        onPress={onToggleScheduleTime}
        label="Pobieraj temperaturę cyklicznie"
      />
      {isScheduleTime && (
        <ScheduleDatePicker onChange={handleSetScheduleTime} />
      )}
    </>
  );
};
