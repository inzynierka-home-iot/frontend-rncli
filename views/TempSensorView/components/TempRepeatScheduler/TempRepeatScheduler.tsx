import { FC, useState } from 'react';
import React from 'react-native';
import {
  Button,
  Checkbox,
  ScheduleDatePicker,
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
  const [schedule, setSchedule] = useState({});

  const handleSetScheduleRepeat = () => {
    sendAPIRequest({
      ...tempSensorParams,
      action: 'setSchedule',
      additionalParams: {
        action: 'getTemp',
        ...schedule,
      },
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
        <>
          <ScheduleDatePicker mode="repeat" onChange={setSchedule} />
          <Button text="Ustaw wartość" onPress={handleSetScheduleRepeat} />
        </>
      )}
    </>
  );
};
