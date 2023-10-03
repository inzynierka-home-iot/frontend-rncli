import React from 'react';
import { View } from 'react-native';
import { Checkbox } from './Checkbox';

const MyCheckboxMeta = {
  title: 'Checkbox',
  component: Checkbox,
  decorators: [
    (Story: any) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default MyCheckboxMeta;

export const Basic = {};

export const Success = {
  args: {
    variant: 'success',
  },
};
export const Error = {
  args: {
    variant: 'error',
  },
};
