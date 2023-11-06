import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React, { View } from 'react-native';
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

type RgbLightViewProps = NativeStackScreenProps<RootStackParamList, 'RgbLight'>;

export const RgbLightView: FC<RgbLightViewProps> = ({ route }) => {
  const { deviceId, nodeId, location } = route.params;

  const rgbLight = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as RgbLight;

  const [color, onColorChange] = useInputValue(rgbLight.values.V_RGB);

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
      <View style={styles.content}>
        <Typography
          variant="body-medium"
          text={`Aktualny kolor lampy to: ${rgbLight.values.V_RGB}`}
        />
        <Input text={color} onChange={onColorChange} />
        <Button text="Zmień kolor" onPress={handleChangeColor} />
      </View>
    </View>
  );
};
