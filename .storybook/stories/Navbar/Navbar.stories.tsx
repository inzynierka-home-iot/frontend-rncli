import React from 'react';
import { View } from 'react-native';
import { Navbar } from './Navbar';
import { NavigationContainer } from '@react-navigation/native';

const MyNavbarMeta = {
  title: 'Navbar',
  component: Navbar,
  decorators: [
    (Story: any) => (
      <NavigationContainer>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Story />
        </View>
      </NavigationContainer>
    ),
  ],
};

export default MyNavbarMeta;

export const Basic = {
  args: {
    text: 'Lista urządzeń',
    button: { text: 'Wyloguj', size: 'small', onPress: () => {} },
  },
};
