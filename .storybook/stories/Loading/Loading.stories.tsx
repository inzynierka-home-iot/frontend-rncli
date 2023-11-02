import React from 'react';
import { View } from 'react-native';
import { Loading } from './Loading';

const MyLoadingMeta = {
  title: 'Loading',
  component: Loading,
  decorators: [
    (Story: any) => (
      <View
        style={{
          flex: 1,
        }}>
        <Story />
      </View>
    ),
  ],
};

export default MyLoadingMeta;

export const Basic = {};
