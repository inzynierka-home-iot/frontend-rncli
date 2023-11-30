import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import React from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootStackParamList, Light } from '../../types';
import { useSendAPIRequest } from '../../hooks';

type LightViewProps = NativeStackScreenProps<RootStackParamList, 'Light'>;

export const LightView = ({ route }: LightViewProps) => {
  const { location, nodeId, deviceId, botHash, botId } = route.params;

  const sendIoTAPIRequest = useSendAPIRequest();

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
    sendIoTAPIRequest({
      ...lightActionBaseParams,
      additionalParams: { V_STATUS: 1 },
    });

  const handleLightOff = () =>
    sendIoTAPIRequest({
      ...lightActionBaseParams,
      additionalParams: { V_STATUS: 0 },
    });

  if (!light) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={<Navbar text={`${location} - ${nodeId} - ${light?.name}`} />}>
      <Typography
        variant="body-medium"
        text={`Aktualny status lampy to: ${status ? 'Włączona' : 'Wyłączona'}`}
      />
      {status ? (
        <Button text="Wyłącz" hasFullWidth onPress={handleLightOff} />
      ) : (
        <Button text="Włącz" hasFullWidth onPress={handleLightOn} />
      )}
    </LayoutProvider>
  );
};
