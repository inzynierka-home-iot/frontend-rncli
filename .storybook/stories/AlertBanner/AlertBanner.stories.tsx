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
          flexDirection: 'row',
        }}>
        <Story />
      </View>
    ),
  ],
};

export default MyAlertBanner;

export const Informative = () => {
  const [open, setOpen] = useState(true);

  return (
    <AlertBanner
      text={'Changes saved'}
      isOpen={open}
      onClose={() => setOpen(false)}
    />
  );
};

export const Success = () => {
  const [open, setOpen] = useState(true);

  return (
    <AlertBanner
      text={'Lights turned on! You are enlighted now!'}
      isOpen={open}
      variant="success"
      onClose={() => setOpen(false)}
    />
  );
};

export const Error = () => {
  const [open, setOpen] = useState(true);

  return (
    <AlertBanner
      text={'Error! Cannot update settings'}
      isOpen={open}
      variant="error"
      onClose={() => setOpen(false)}
    />
  );
};
