import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react-native';
import { Navbar, Typography } from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../types';
import { TempSensor } from '../../types/Device';
import {
  CurrentTempLabel,
  TempHistoryChart,
  TempRepeatScheduler,
} from './components';
import { LayoutProvider } from '../../components';

export type TempSensorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'TempSensor'
>;

export const TempSensorView = ({ route }: TempSensorViewProps) => {
  const { location, nodeId, deviceId } = route.params;

  const tempSensor = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as TempSensor;

  if (!tempSensor) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={
        <Navbar text={`${location} - ${nodeId} - ${tempSensor?.name}`} />
      }>
      <CurrentTempLabel
        tempValueRaw={tempSensor.values.V_TEMP}
        tempSensorParams={route.params}
      />
      <TempHistoryChart tempSensorParams={route.params} />
      <TempRepeatScheduler
        tempSensorParams={route.params}
        tempSensorSchedule={tempSensor.schedule}
      />
    </LayoutProvider>
  );
};
