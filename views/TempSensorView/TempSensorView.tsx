import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { View } from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../types';
import { styles } from './TempSensorView.styles';
import { TempSensor } from '../../types/Device';
import { useMemo } from 'react';
import { useTempHistory } from '../../hooks/useTempHistory';
import { useSendAPIRequest } from '../../hooks';
import { DataChart } from '../../.storybook/stories/DataChart';
import { selectTempSensorSubscription } from '../../redux/currentTempSensorSlice';
import { LayoutProvider } from '../../components';

type TempSensorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'TempSensor'
>;

export const TempSensorView = ({ route }: TempSensorViewProps) => {
  const { location, nodeId, deviceId, botId, botHash } = route.params;

  const sendIoTAPIRequest = useSendAPIRequest();

  const currentTempSensorHistory = useTempHistory({
    location,
    nodeId,
    deviceId,
    botId,
    botHash,
  });

  const subscription = useAppSelector(selectTempSensorSubscription);

  const tempSensor = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as TempSensor;

  const tempSensorActionBaseParams = {
    ...route.params,
    action: 'status',
    additionalParams: 'V_TEMP',
  };

  const handleGetTemp = () =>
    sendIoTAPIRequest({
      ...tempSensorActionBaseParams,
    });

  const handleGetTempHistory = () =>
    sendIoTAPIRequest({
      ...tempSensorActionBaseParams,
      action: 'statusAll',
    });

  const handleSubscribe = () => {
    sendIoTAPIRequest({
      ...tempSensorActionBaseParams,
      action: 'subscribe',
    });
  };

  const handleUnsubscribe = () => {
    sendIoTAPIRequest({
      ...tempSensorActionBaseParams,
      action: 'unsubscribe',
    });
  };

  const tempValue = useMemo(
    () => Math.round(tempSensor?.values.V_TEMP * 100) / 100,
    [tempSensor.values.V_TEMP],
  );

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
      <Typography
        variant="body-medium"
        text={`Aktualna temperatura: ${tempValue}°C`}
      />
      <Button
        text="Pobierz aktualną temperaturę"
        hasFullWidth
        onPress={handleGetTemp}
      />
      <Button
        text="Pobierz historię"
        hasFullWidth
        onPress={handleGetTempHistory}
      />
      {subscription ? (
        <Button
          text="Anuluj subskrypcję"
          variant="error"
          hasFullWidth
          onPress={handleUnsubscribe}
        />
      ) : (
        <Button
          text="Subskrybuj"
          variant="success"
          hasFullWidth
          onPress={handleSubscribe}
        />
      )}
      {!!currentTempSensorHistory.length && (
        <View style={styles.tempChart}>
          <Typography
            variant="body-medium"
            text={`Wykres z ostatnich ${currentTempSensorHistory.length} odczytów`}
          />
          <DataChart chartData={currentTempSensorHistory} suffix="°C" />
        </View>
      )}
    </LayoutProvider>
  );
};
