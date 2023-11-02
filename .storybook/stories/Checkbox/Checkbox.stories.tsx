import React, { useState } from 'react';
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

export const Basic = () => {
  const [checked, setChecked] = useState(true);
  const onPress = () => setChecked(!checked);

  return <Checkbox checked={checked} onPress={onPress} />;
};

export const Success = () => {
  const [checked, setChecked] = useState(true);
  const onPress = () => setChecked(!checked);

  return <Checkbox variant="success" checked={checked} onPress={onPress} />;
};

export const Error = () => {
  const [checked, setChecked] = useState(true);
  const onPress = () => setChecked(!checked);

  return <Checkbox variant="error" checked={checked} onPress={onPress} />;
};
