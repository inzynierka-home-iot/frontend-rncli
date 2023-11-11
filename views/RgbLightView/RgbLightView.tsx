import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useState } from 'react';
import React, { Keyboard, ScrollView, View } from 'react-native';
import {
  Button,
  Navbar,
  Typography,
  ColorPickerRGB,
} from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RgbLight, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';
import { styles } from './RgbLightView.styles';

type RgbLightViewProps = NativeStackScreenProps<RootStackParamList, 'RgbLight'>;

export const RgbLightView: FC<RgbLightViewProps> = ({ route }) => {
  const { deviceId, nodeId, location } = route.params;

  const rgbLight = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as RgbLight;

  const [color, onColorChange] = useState(rgbLight.values.V_RGB);

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
      <ScrollView onScrollBeginDrag={Keyboard.dismiss}>
        <View style={styles.content}>
          <Typography
            variant="body-medium"
            text={`Aktualny kolor lampy to: ${rgbLight.values.V_RGB}`}
          />
          <ColorPickerRGB color={color} onChange={onColorChange} />
          <Button text="Zmień kolor" onPress={handleChangeColor} />
        </View>
      </ScrollView>
    </View>
  );
};
