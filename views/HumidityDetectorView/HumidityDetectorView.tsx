import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React, { View } from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { HumidityDetector, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';
import { styles } from './HumidityDetectorView.styles';

type HumidityDetectorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'HumidityDetector'
>;

export const HumidityDetectorView: FC<HumidityDetectorViewProps> = ({
  route,
}) => {
  const { deviceId, nodeId, location } = route.params;

  const humidityDetector = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as HumidityDetector;

  const handleGetHum = () => {
    sendAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_HUM',
    });
  };

  if (!humidityDetector) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <View style={styles.container}>
      <Navbar text={`${location} - ${nodeId} - ${humidityDetector?.name}`} />
      <View style={styles.content}>
        <Typography
          variant="body-medium"
          text={`Aktualny stan wilgotności: ${humidityDetector.values.V_HUM}`}
        />
        <Button text="Pobierz aktualny stan" onPress={handleGetHum} />
      </View>
    </View>
  );
};
