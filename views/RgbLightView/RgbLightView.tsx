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
import { useAppSelector } from '../../redux/hooks';
import { useSendAPIRequest } from '../../hooks';
import { RgbLight, RootStackParamList } from '../../types';

type RgbLightViewProps = NativeStackScreenProps<RootStackParamList, 'RgbLight'>;

export const RgbLightView: FC<RgbLightViewProps> = ({ route }) => {
  const { location, nodeId, deviceId } = route.params;

  const sendIoTAPIRequest = useSendAPIRequest();

  const rgbLight = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as RgbLight;

  const [color, onColorChange] = useState(rgbLight.values.V_RGB);

  const handleChangeColor = () => {
    sendIoTAPIRequest({
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
    <LayoutProvider
      navbar={
        <Navbar
          text={`${location} - ${nodeId} - ${rgbLight?.name}`}
          variant="header-small"
        />
      }>
      <Typography
        variant="body-medium"
        text={`Aktualny kolor lampy to: ${rgbLight.values.V_RGB}`}
      />
      <ColorPickerRGB color={color} onChange={onColorChange} />
      <Button text="Zmień kolor" onPress={handleChangeColor} />
    </LayoutProvider>
  );
};
