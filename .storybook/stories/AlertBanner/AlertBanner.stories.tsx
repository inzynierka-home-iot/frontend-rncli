import { View } from 'react-native';
import { AlertBanner } from './AlertBanner';
import React, { useState } from 'react';

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
        }}>
        <Story />
      </View>
    ),
  ],
};

export default MyAlertBanner;

export const Informative = () => {
  return <AlertBanner text="Changes saved" onClose={() => {}} />;
};

export const Success = () => {
  return (
    <AlertBanner
      text="Lights turned on! You are enlighted now!"
      variant="success"
      onClose={() => {}}
    />
  );
};

export const Error = () => {
  return (
    <AlertBanner
      text="Error! Cannot update settings"
      variant="error"
      onClose={() => {}}
    />
  );
};
