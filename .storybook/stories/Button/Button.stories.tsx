import React from 'react';
import { View } from 'react-native';
import { Button } from './Button';

const MyButtonMeta = {
  title: 'Button',
  component: Button,
  args: {
    text: 'Hello world',
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default MyButtonMeta;

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
