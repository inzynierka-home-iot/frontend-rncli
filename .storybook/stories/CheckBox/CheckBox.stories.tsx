import React from 'react';
import { View } from 'react-native';
import { CheckBox } from './CheckBox';
import { useCheckBoxValue } from './useCheckBoxValue';

const MyCheckBoxMeta = {
  title: 'CheckBox',
  component: CheckBox,
  decorators: [
    (Story: any) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default MyCheckBoxMeta;

export const Basic = () => {
  const [checked, onPress] = useCheckBoxValue(true);

  return <CheckBox checked={checked} onPress={onPress} />;
};

export const Success = () => {
  const [checked, onPress] = useCheckBoxValue(true);

  return <CheckBox variant="success" checked={checked} onPress={onPress} />;
};

export const Error = () => {
  const [checked, onPress] = useCheckBoxValue(true);

  return <CheckBox variant="error" checked={checked} onPress={onPress} />;
};
