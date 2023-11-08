import React, { FC, useEffect } from 'react';
import { theme } from '../../theme';
import { Input, useInputValue } from '../Input';
import ColorPicker from 'react-native-wheel-color-picker';
import { StyleSheet, View } from 'react-native';

export type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

export const ColorPickerRGB: FC<ColorPickerProps> = ({ color, onChange }) => {
  const regExp = new RegExp('^(?:[A-Fa-f0-9]{6})$');

  const [input, onInputChange] = useInputValue(color);

  useEffect(() => {
    onInputChange(color);
  }, [color]);

  const inputColorChange = (rgbColor: string) => {
    if (rgbColor.length <= 6) {
      onInputChange(rgbColor);
    }
    if (regExp.test(rgbColor)) {
      onChange('#' + rgbColor);
    }
  };

  return (
    <View style={styles.container}>
      <ColorPicker
        color={'#' + color}
        onColorChangeComplete={onChange}
        thumbSize={theme.spacing(5)}
        sliderSize={theme.spacing(8)}
        gapSize={theme.spacing(3)}
      />
      <Input
        text={input}
        autoCapitalize="none"
        onChange={onInputChange}
        onBlur={inputColorChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: theme.spacing(5),
  },
});
