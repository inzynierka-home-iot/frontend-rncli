import React, { useState } from 'react';
import { View } from 'react-native';
import { ColorPickerRGB } from './ColorPickerRGB';
import { theme } from '../../theme';

const MyColorPickerRGBMeta = {
  title: 'ColorPickerRGB',
  component: ColorPickerRGB,
  decorators: [
    (Story: any) => (
      <View
        style={{
          flex: 1,
          padding: theme.spacing(5),
        }}>
        <Story />
      </View>
    ),
  ],
};

export default MyColorPickerRGBMeta;

export const Basic = () => {
  const [color, onColorChange] = useState('60ffa2');

  const colorPickerColorChange = (rgbColor: string) => {
    const colorValue = rgbColor.split('#')[1];
    onColorChange(colorValue);
  };

  return <ColorPickerRGB color={color} onChange={colorPickerColorChange} />;
};
