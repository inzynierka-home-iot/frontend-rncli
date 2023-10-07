import React from 'react';
import { Input } from './Input';
import { View } from 'react-native';

const MyTextInputMeta = {
  title: 'Input',
  component: Input,
  decorators: [
    (Story: any) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default MyTextInputMeta;

export const Basic = {};

export const Active = {
  args: {
    variant: 'active',
  },
};

export const Error = {
  args: {
    variant: 'error',
  },
};

export const Disabled = {
  args: {
    text: '',
    variant: 'disabled',
  },
};
