import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { useSendAPIRequest } from '../../hooks';
import { MotionDetector, RootStackParamList } from '../../types';

type MotionDetectorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'MotionDetector'
>;

export const MotionDetectorView: FC<MotionDetectorViewProps> = ({ route }) => {
  const { location, nodeId, deviceId } = route.params;

  const sendIoTAPIRequest = useSendAPIRequest();

  const motionDetector = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as MotionDetector;

  const handleGetMotionStatus = () => {
    sendIoTAPIRequest({
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
        <Navbar
          text={`${location} - ${nodeId} - ${motionDetector?.name}`}
          variant="header-small"
        />
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
