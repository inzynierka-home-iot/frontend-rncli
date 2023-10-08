import React from 'react';
import { Button } from './Button';
import { View } from 'react-native';

const MyButtonMeta = {
  title: 'Button',
  component: Button,
  args: {
    text: 'Hello world',
  },
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          flexDirection: 'row',
        }}>
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

export const Disabled = {
  args: {
    disabled: true,
  },
};
