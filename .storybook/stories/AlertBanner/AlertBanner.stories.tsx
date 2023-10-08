import { View } from 'react-native';
import { AlertBanner } from './AlertBanner';
import React from 'react';

const MyAlertBanner = {
  title: 'Alert Banner',
  component: AlertBanner,

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

export default MyAlertBanner;

export const Informative = {
  args: {
    text: 'Changes saved',
    variant: 'informative',
  },
};

export const Success = {
  args: {
    text: 'Lights turned on! You are enlighted now!',
    variant: 'success',
  },
};

export const Error = {
  args: {
    text: 'Error! Cannot update settings',
    variant: 'error',
  },
};
