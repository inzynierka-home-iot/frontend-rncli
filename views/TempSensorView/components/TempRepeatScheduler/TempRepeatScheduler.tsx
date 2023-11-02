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

type TempRepeatSchedulerProps = {
  tempSensorParams: TempSensorBaseParams;
};

export const TempRepeatScheduler: FC<TempRepeatSchedulerProps> = ({
  tempSensorParams,
}) => {
  const [isScheduleRepeat, onToggleScheduleRepeat] = useCheckboxValue();

  const handleSetScheduleRepeat = (value: ScheduleDateValue) => {
    sendAPIRequest({
      ...tempSensorParams,
      action: 'scheduleRepeat',
      additionalParams: value,
    });
  };

  return (
    <>
      <Checkbox
        checked={isScheduleRepeat}
        onPress={onToggleScheduleRepeat}
        label="Pobieraj temperaturę o określonej godzinie"
      />
      {isScheduleRepeat && (
        <ScheduleDatePicker mode="repeat" onChange={handleSetScheduleRepeat} />
      )}
    </>
  );
};
