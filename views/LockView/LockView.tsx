import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React from 'react-native';
import { Navbar, Typography } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { Lock, RootStackParamList } from '../../types';

type LockViewProps = NativeStackScreenProps<RootStackParamList, 'Lock'>;

export const LockView: FC<LockViewProps> = ({ route }) => {
  const { location, nodeId, deviceId } = route.params;

  const lock = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as Lock;

  if (!lock) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={<Navbar text={`${location} - ${nodeId} - ${lock?.name}`} />}>
      <Typography
        variant="body-medium"
        text={`Aktualny stan zamka: ${
          lock.values.V_LOCK_STATUS === '0' ? 'Otwarty' : 'Zamknięty'
        }`}
      />
    </LayoutProvider>
  );
};
