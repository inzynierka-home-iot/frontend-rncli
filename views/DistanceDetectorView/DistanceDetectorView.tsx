import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { useSendAPIRequest } from '../../hooks';
import { DistanceDetector, RootStackParamList } from '../../types';

type DistanceDetectorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'DistanceDetector'
>;

export const DistanceDetectorView: FC<DistanceDetectorViewProps> = ({
  route,
}) => {
  const { deviceId, nodeId, location } = route.params;

  const sendIoTAPIRequest = useSendAPIRequest();

  const distanceDetector = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as DistanceDetector;

  const handleGetDistance = () => {
    sendIoTAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_DISTANCE',
    });
  };

  if (!distanceDetector) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={
        <Navbar text={`${location} - ${nodeId} - ${distanceDetector?.name}`} />
      }>
      <Typography
        variant="body-medium"
        text={`Aktualny dystans od czunika: ${distanceDetector.values.V_DISTANCE}cm`}
      />
      <Button text="Pobierz aktualny dystans" onPress={handleGetDistance} />
    </LayoutProvider>
  );
};
