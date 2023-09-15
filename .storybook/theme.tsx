import { StyleProp, TextProps, TextStyle } from "react-native/types";

export const theme: Theme = {
  spacing: (num) => num * 4,
  colors: {
    'text-primary': '#212121',
    'text-secondary': '#646D82',
    'text-invertedPrimary': '#FFFFFF',
    'action-primary': '#3949ab',
    'action-active': '#273377',
    'action-selected': '#113997',
  },
  typography: {
    'header-large': {
      fontFamily: 'Inter',
      fontSize: 40,
      fontStyle: 'normal',
      fontWeight: '700',
    },
    'header-medium': {
      fontFamily: 'Inter',
      fontSize: 32,
      fontStyle: 'normal',
      fontWeight: '700',
    },
    'header-small': {
      fontFamily: 'Inter',
      fontSize: 24,
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
    }
  }
}

export type TypographyKeys = 'header-large' | 'header-medium' | 'header-small' | 'body-large' | 'body-medium' | 'body-small'

export type ColorKeys = 'text-primary' | 'text-secondary' | 'text-invertedPrimary' | 'action-primary' | 'action-active' | 'action-selected'

export type Theme = {
  spacing: (num: number) => number
  colors: Record<ColorKeys, string>
  typography: Record<TypographyKeys, StyleProp<TextStyle>>
}