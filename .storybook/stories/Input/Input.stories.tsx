import React, { useState } from 'react';
import { Input } from './Input';
import { View } from 'react-native';

const MyTextInputMeta = {
  title: 'Input',
  component: Input,
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

export default MyTextInputMeta;

export const Basic = () => {
  const [text, setText] = useState('Input value');

  return <Input text={text} onChange={e => setText(e)} />;
};

export const Error = () => {
  const [text, setText] = useState('Input value');

  return <Input variant="error" text={text} onChange={e => setText(e)} />;
};

export const Disabled = () => {
  const [text, setText] = useState('Input value');

  return <Input editable={false} text={text} onChange={e => setText(e)} />;
};
