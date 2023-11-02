import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ScrollView, View } from 'react-native';
import { Navbar, Typography } from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../types';
import { styles } from './TempSensorView.styles';
import { TempSensor } from '../../types/Device';
import {
  CurrentTempLabel,
  TempHistoryChart,
  TempTimeScheduler,
} from './components';
import { TempRepeatScheduler } from './components/TempRepeatScheduler';

export type TempSensorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'TempSensor'
>;

export type TempSensorBaseParams = {
  location: string;
  nodeId: string;
  deviceId: string;
  botHash: string;
  botId: string;
};

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
    <View style={styles.container}>
      <Navbar text={`${location} - ${nodeId} - ${tempSensor.name}`} />
      <ScrollView>
        <View style={styles.content}>
          <CurrentTempLabel
            tempValueRaw={tempSensor.values.V_TEMP}
            tempSensorParams={route.params}
          />
          <TempHistoryChart tempSensorParams={route.params} />
          <TempTimeScheduler tempSensorParams={route.params} />
          <TempRepeatScheduler tempSensorParams={route.params} />
        </View>
      </ScrollView>
    </View>
  );
};
