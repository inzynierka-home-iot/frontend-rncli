import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useState } from 'react';
import React, { Keyboard, ScrollView, View } from 'react-native';
import {
  Button,
  Input,
  Navbar,
  Typography,
  useInputValue,
} from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RgbLight, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';
import { styles } from './RgbLightView.styles';
import ColorPicker from 'react-native-wheel-color-picker';
import { ColorPickerRGB } from '../../.storybook/stories/ColorPickerRGB/ColorPickerRGB';

type RgbLightViewProps = NativeStackScreenProps<RootStackParamList, 'RgbLight'>;

export const RgbLightView: FC<RgbLightViewProps> = ({ route }) => {
  const { deviceId, nodeId, location } = route.params;

  const rgbLight = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as RgbLight;

  const [color, onColorChange] = useState(rgbLight.values.V_RGB);

  const colorPickerColorChange = (rgbColor: string) => {
    const colorValue = rgbColor.split('#')[1];
    onColorChange(colorValue);
  };

  const handleChangeColor = () => {
    sendAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_RGB=${color}`,
    });
  };

  if (!rgbLight) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <View style={styles.container}>
      <Navbar text={`${location} - ${nodeId} - ${rgbLight?.name}`} />
      <ScrollView onScrollBeginDrag={() => Keyboard.dismiss()}>
        <View style={styles.content}>
          <Typography
            variant="body-medium"
            text={`Aktualny kolor lampy to: ${rgbLight.values.V_RGB}`}
          />
          <ColorPickerRGB color={color} onChange={colorPickerColorChange} />
          <Button text="Zmień kolor" onPress={handleChangeColor} />
        </View>
      </ScrollView>
    </View>
  );
};
