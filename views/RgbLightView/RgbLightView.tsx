import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useState } from 'react';
import React from 'react-native';
import {
  Button,
  Navbar,
  Typography,
  ColorPickerRGB,
} from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RgbLight, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';

type RgbLightViewProps = NativeStackScreenProps<RootStackParamList, 'RgbLight'>;

export const RgbLightView: FC<RgbLightViewProps> = ({ route }) => {
  const { deviceId, nodeId, location } = route.params;

  const dispatch = useAppDispatch();

  const rgbLight = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as RgbLight;

  const [color, onColorChange] = useState(rgbLight.values.V_RGB);

  const handleChangeColor = () => {
    sendAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: `V_RGB=${color}`,
      dispatch,
    });
  };

  if (!rgbLight) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={<Navbar text={`${location} - ${nodeId} - ${rgbLight?.name}`} />}>
      <Typography
        variant="body-medium"
        text={`Aktualny kolor lampy to: ${rgbLight.values.V_RGB}`}
      />
      <ColorPickerRGB color={color} onChange={onColorChange} />
      <Button text="Zmień kolor" onPress={handleChangeColor} />
    </LayoutProvider>
  );
};
