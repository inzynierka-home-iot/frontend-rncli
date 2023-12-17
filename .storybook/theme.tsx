import { StyleProp, TextStyle } from 'react-native/types';

export const theme: Theme = {
  spacing: num => num * 4,
  colors: {
    'text-primary': '#212121',
    'text-secondary': '#646D82',
    'text-invertedPrimary': '#FFFFFF',
    'text-informative': '#3949ab',
    'text-error': '#C53434',
    'text-success': '#1D7C4D',
    'background-primary': '#fafafa',
    'background-inverted': '#212121',
    'background-neutral': '#555F6D',
    'background-subtle': '#DEE3E7',
    'action-primary': '#3949ab',
    'action-hover': '#303f9f',
    'action-active': '#273377',
    'action-selected': '#113997',
    'background-gradient-from': '#3282d9',
    'background-gradient-to': '#1c599c',
  },
  typography: {
    'header-large': {
      fontFamily: 'Inter',
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '700',
    },
    'header-medium': {
      fontFamily: 'Inter',
      fontSize: 22,
      fontStyle: 'normal',
      fontWeight: '700',
    },
    'header-small': {
      fontFamily: 'Inter',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '700',
    },
    'body-large': {
      fontFamily: 'Inter',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '400',
    },
    'body-medium': {
      fontFamily: 'Inter',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '400',
    },
    'body-small': {
      fontFamily: 'Inter',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
    },
  },
};

export type TypographyKeys =
  | 'header-large'
  | 'header-medium'
  | 'header-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small';

export type ColorKeys =
  | 'text-primary'
  | 'text-secondary'
  | 'text-invertedPrimary'
  | 'text-informative'
  | 'text-error'
  | 'text-success'
  | 'background-primary'
  | 'background-inverted'
  | 'background-neutral'
  | 'background-subtle'
  | 'action-primary'
  | 'action-hover'
  | 'action-active'
  | 'action-selected'
  | 'background-gradient-from'
  | 'background-gradient-to';

export type Theme = {
  spacing: (num: number) => number;
  colors: Record<ColorKeys, string>;
  typography: Record<TypographyKeys, StyleProp<TextStyle>>;
};
