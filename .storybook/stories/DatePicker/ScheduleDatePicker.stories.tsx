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

export const Interval = {
  args: {
    onChange: (value: any) => { console.log(value) }
  }
};

export const Repeat = {
  args: {
    mode: 'repeat',
    onChange: (value: any) => { console.log(value) }
  }
};