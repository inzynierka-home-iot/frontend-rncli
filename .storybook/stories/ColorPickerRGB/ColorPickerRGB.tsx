import React, { FC, useEffect } from 'react';
import { theme } from '../../theme';
import { Input, useInputValue } from '../Input';
import ColorPicker from 'react-native-wheel-color-picker';
import { StyleSheet, View } from 'react-native';

export type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

const regExp = new RegExp('^(?:[A-Fa-f0-9]{6})$');

export const ColorPickerRGB: FC<ColorPickerProps> = ({ color, onChange }) => {
  const [input, onInputChange] = useInputValue(color);

  useEffect(() => {
    onInputChange(color);
  }, [color]);

  const inputColorChange = (rgbColor: string) => {
    if (regExp.test(rgbColor)) {
      onChange(rgbColor);
    }
  };

  const onColorChange = (rgbColor: string) => {
    const colorValue = rgbColor.split('#')[1];
    onChange(colorValue);
  };

  return (
    <View style={styles.container}>
      <ColorPicker
        color={'#' + color}
        onColorChangeComplete={onColorChange}
        thumbSize={theme.spacing(5)}
        sliderSize={theme.spacing(8)}
        gapSize={theme.spacing(3)}
      />
      <Input
        text={input}
        autoCapitalize="none"
        onChange={onInputChange}
        onBlur={inputColorChange}
        placeholder="Podaj kolor RGB"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing(5),
  },
});
