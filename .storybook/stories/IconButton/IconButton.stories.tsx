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
