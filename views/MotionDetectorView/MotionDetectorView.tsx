import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { MotionDetector, RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';

type MotionDetectorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'MotionDetector'
>;

export const MotionDetectorView: FC<MotionDetectorViewProps> = ({ route }) => {
  const { deviceId, nodeId, location } = route.params;

  const motionDetector = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as MotionDetector;

  const handleGetMotionStatus = () => {
    sendAPIRequest({
      ...route.params,
      action: 'status',
      additionalParams: 'V_TRIPPED',
    });
  };

  if (!motionDetector) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={
        <Navbar text={`${location} - ${nodeId} - ${motionDetector?.name}`} />
      }>
      <Typography
        variant="body-medium"
        text={`Aktualny stan: ${
          motionDetector.values.V_TRIPPED === '1' ? 'ruch' : 'brak ruchu'
        }`}
      />
      <Button text="Pobierz aktualny stan" onPress={handleGetMotionStatus} />
    </LayoutProvider>
  );
};
