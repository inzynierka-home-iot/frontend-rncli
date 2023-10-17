import React from 'react';
import { View } from 'react-native';
import { Navbar } from './Navbar';
import { Button } from '../Button/Button';

const MyNavbarMeta = {
  title: 'Navbar',
  component: Navbar,
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

export default MyNavbarMeta;

export const Basic = {
  args: {
    text: 'Lista urządzeń',
    buttons: [{ text: 'Wyloguj', size: 'small', onPress: () => {} }],
  },
};
