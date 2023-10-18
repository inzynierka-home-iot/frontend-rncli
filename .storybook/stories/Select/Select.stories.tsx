import React, { useState } from 'react';
import { View } from 'react-native';
import { Select } from './Select';

const MySelectMeta = {
  title: 'Select',
  component: Select,
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

const data = [
  { display: '1', value: 'a' },
  { display: '2', value: 'b' },
  { display: '3', value: 'c' },
  { display: '4', value: 'd' },
];

export default MySelectMeta;

export const Basic = () => {
  const [index, setIndex] = useState<number>(0);
  return (
    <Select
      selectData={data}
      index={index}
      onSelect={number => setIndex(number)}
    />
  );
};

export const Error = () => {
  const [index, setIndex] = useState<number>(0);
  return (
    <Select
      selectData={data}
      variant="error"
      index={index}
      onSelect={number => setIndex(number)}
    />
  );
};

export const Disabled = () => {
  const [index, setIndex] = useState<number>(0);
  return (
    <Select
      selectData={data}
      disabled={true}
      index={index}
      onSelect={number => setIndex(number)}
    />
  );
};
