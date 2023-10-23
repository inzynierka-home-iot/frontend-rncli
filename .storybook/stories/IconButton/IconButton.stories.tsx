import React from 'react';
import { IconButton } from './IconButton';
import { View } from 'react-native';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const MyIconButtonMeta = {
  title: 'IconButton',
  component: IconButton,
  args: {
    icon: faChevronLeft,
  },
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

export default MyIconButtonMeta;

export const Basic = {};

export const Success = {
  args: {
    variant: 'success',
  },
};

export const Error = {
  args: {
    variant: 'error',
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};
