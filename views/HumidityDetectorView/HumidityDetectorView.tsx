import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { HumidityDetector, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';

type HumidityDetectorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'HumidityDetector'
>;

export const HumidityDetectorView: FC<HumidityDetectorViewProps> = ({
  route,
}) => {
  const { deviceId, nodeId, location } = route.params;

  const dispatch = useAppDispatch();

  const humidityDetector = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as HumidityDetector;

  const handleGetHum = () => {
    sendAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_HUM',
      dispatch,
    });
  };

  if (!humidityDetector) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={
        <Navbar text={`${location} - ${nodeId} - ${humidityDetector?.name}`} />
      }>
      <Typography
        variant="body-medium"
        text={`Aktualny stan wilgotności: ${humidityDetector.values.V_HUM}`}
      />
      <Button text="Pobierz aktualny stan" onPress={handleGetHum} />
    </LayoutProvider>
  );
};
