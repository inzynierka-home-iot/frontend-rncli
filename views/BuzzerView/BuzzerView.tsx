import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import React from 'react-native';
import { Navbar, Typography } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { Buzzer, RootStackParamList } from '../../types';
import { TurnOnBuzzerSelect } from './components/TurnOnBuzzerSelect';

type BuzzerViewProps = NativeStackScreenProps<RootStackParamList, 'Buzzer'>;

export const BuzzerView: FC<BuzzerViewProps> = ({ route }) => {
  const { location, nodeId, deviceId } = route.params;

  const buzzer = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as Buzzer;

  if (!buzzer) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={<Navbar text={`${location} - ${nodeId} - ${buzzer?.name}`} />}>
      <Typography
        variant="body-medium"
        text={`Aktualny stan alarmu: ${buzzer.values.V_STATUS === '0' ? 'Wyłączony' : 'Włączony'
          }`}
      />
      <TurnOnBuzzerSelect
        buzzerBaseParams={route.params}
        buzzerSchedule={buzzer.schedule}
      />
    </LayoutProvider>
  );
};
