import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import React, { View } from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../types';
import { Light } from '../../types/Device';
import { sendAPIRequest } from '../../utils';
import { styles } from './LightView.styles';

type LightViewProps = NativeStackScreenProps<RootStackParamList, 'Light'>;

export const LightView = ({ route }: LightViewProps) => {
  const { deviceId, nodeId, botHash, botId, location } = route.params;

  const light = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as Light;

  const lightActionBaseParams = {
    location,
    nodeId,
    deviceId,
    action: 'set',
    botHash,
    botId,
  };

  const status = useMemo(
    () => light.values.V_STATUS === '1',
    [light.values.V_STATUS],
  );

  const handleLightOn = () =>
    sendAPIRequest({
      ...lightActionBaseParams,
      additionalParams: 'V_STATUS=1',
    });

  const handleLightOff = () =>
    sendAPIRequest({
      ...lightActionBaseParams,
      additionalParams: 'V_STATUS=0',
    });

  const handleAllLightsOn = () =>
    sendAPIRequest({
      ...lightActionBaseParams,
      deviceId: '*',
      additionalParams: 'V_STATUS=1',
    });

  const handleAllLightsOff = () =>
    sendAPIRequest({
      ...lightActionBaseParams,
      deviceId: '*',
      additionalParams: 'V_STATUS=0',
    });

  if (!light) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <View style={styles.container}>
      <Navbar text={`${location} - ${nodeId} - ${light?.name}`} />
      <View style={styles.content}>
        <Typography
          variant="body-medium"
          text={`Aktualny status lampy to: ${
            status ? 'Włączona' : 'Wyłączona'
          }`}
        />
        {status ? (
          <Button text="Wyłącz" hasFullWidth onPress={handleLightOff} />
        ) : (
          <Button text="Włącz" hasFullWidth onPress={handleLightOn} />
        )}
        <Button
          text="Włącz wszystkie w danym nodzie"
          variant="success"
          hasFullWidth
          onPress={handleAllLightsOn}
        />
        <Button
          text="Wyłącz wszystkie w danym nodzie"
          variant="error"
          hasFullWidth
          onPress={handleAllLightsOff}
        />
      </View>
    </View>
  );
};
