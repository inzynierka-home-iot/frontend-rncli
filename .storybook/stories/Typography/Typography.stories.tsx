import React from 'react';
import { View } from 'react-native';
import { Typography } from './Typography';

const meta = {
  title: 'Typography',
  component: Typography,
  args: {
    text: 'Hello world',
  },
  decorators: [
    (Story: any) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

export const HeaderLarge = {
  args: {
    variant: 'header-large',
  },
};

export const HeaderMedium = {
  args: {
    variant: 'header-medium',
  },
};

export const HeaderSmall = {
  args: {
    variant: 'header-small',
  },
};

export const BodyLarge = {
  args: {
    variant: 'body-large',
  },
};

export const BodeMedium = {
  args: {
    variant: 'body-medium',
  },
};

export const BodySmall = {
  args: {
    variant: 'body-small',
  },
};
