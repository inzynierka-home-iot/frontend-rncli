import React, { useEffect, useState } from 'react';
import { ScheduleDatePicker } from './ScheduleDatePicker';
import { View } from 'react-native';

const MyScheduleDatePickerMeta = {
  title: 'ScheduleDatePicker',
  component: ScheduleDatePicker,
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Story />
      </View>
    ),
  ],
};

export default MyScheduleDatePickerMeta;

export const Interval = () => {
  const initialSchedule = {
    hours: 12,
    minutes: 0,
    days: [3],
  };
  const [schedule, setSchedule] = useState(initialSchedule);
  return <ScheduleDatePicker schedule={schedule} onChange={setSchedule} />;
};
export const Repeat = () => {
  const initialSchedule = {
    hours: 12,
    minutes: 0,
    days: [3],
  };
  const [schedule, setSchedule] = useState(initialSchedule);
  return (
    <ScheduleDatePicker
      schedule={schedule}
      onChange={setSchedule}
      mode="repeat"
    />
  );
};
