import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { View } from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../types';
import { sendAPIRequest } from '../../utils';
import { styles } from './TempSensorView.styles';
import { TempSensor } from '../../types/Device';

type TempSensorViewProps = NativeStackScreenProps<
  RootStackParamList,
  'TempSensor'
>;

export const TempSensorView = ({ route }: TempSensorViewProps) => {
  const { deviceId, nodeId, botHash, botId, location } = route.params;

  const tempSensor = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as TempSensor;

  const tempSensorActionBaseParams = {
    location,
    nodeId,
    deviceId,
    action: 'status',
    botHash,
    botId,
  };

  const handleGetTemp = () =>
    sendAPIRequest({
      ...tempSensorActionBaseParams,
      additionalParams: 'V_TEMP',
    });

  const handleGetTempHistory = () =>
    sendAPIRequest({
      ...tempSensorActionBaseParams,
      action: 'statusAll',
      additionalParams: 'V_TEMP',
    });

  const handleSubscribe = () => {
    sendAPIRequest({
      ...tempSensorActionBaseParams,
      action: 'subscribe',
      additionalParams: 'V_TEMP',
    });
  };

  const handleUnsubscribe = () => {
    sendAPIRequest({
      ...tempSensorActionBaseParams,
      action: 'unsubscribe',
      additionalParams: 'V_TEMP',
    });
  };

  if (!tempSensor) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <View style={styles.container}>
      <Navbar text={`${location} - ${nodeId} - ${tempSensor?.name}`} />
      <View style={styles.content}>
        <Typography variant="body-medium" text="Aktualna temperatura: " />
        <Typography variant="body-medium" text={tempSensor?.values.V_TEMP} />
        <Button text="Pobierz" hasFullWidth onPress={handleGetTemp} />
        <Button
          text="Pobierz historię"
          hasFullWidth
          onPress={handleGetTempHistory}
        />
        {tempSensor.values.SUBSCRIBE ? (
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
        {/* TODO */}
        {!!tempSensor.values.HISTORY?.length && (
          <Typography variant="body-medium" text="WYKRESIK" />
        )}
      </View>
    </View>
  );
};
