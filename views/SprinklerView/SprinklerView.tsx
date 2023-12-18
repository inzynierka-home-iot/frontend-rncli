import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import React from 'react-native';
import { Button, Navbar, Typography } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { selectDeviceWithId } from '../../redux/devicesSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootStackParamList, Sprinkler } from '../../types';
import { useSendAPIRequest } from '../../hooks';
import { TurnOnSprinklerSelect } from './TurnOnSprinklerSelect';

type SprinklerViewProps = NativeStackScreenProps<
  RootStackParamList,
  'Sprinkler'
>;

export const SprinklerView = ({ route }: SprinklerViewProps) => {
  const { location, nodeId, deviceId, botHash, botId } = route.params;

  const sendIoTAPIRequest = useSendAPIRequest();

  const sprinkler = useAppSelector(state =>
    selectDeviceWithId(state, location, nodeId, deviceId),
  ) as Sprinkler;

  // const sprinklerActionBaseParams = {
  //   location,
  //   nodeId,
  //   deviceId,
  //   botHash,
  //   botId,
  // };

  const status = useMemo(
    () => sprinkler.values.V_STATUS === '1',
    [sprinkler.values.V_STATUS],
  );

  const handleSprinklerOn = () =>
    sendIoTAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: { V_STATUS: 1 },
    });

  const handleSprinklerOff = () =>
    sendIoTAPIRequest({
      ...route.params,
      action: 'set',
      additionalParams: { V_STATUS: 0 },
    });

  if (!sprinkler) {
    return (
      <Typography variant="header-large" text="Nie znaleziono urządzenia" />
    );
  }

  return (
    <LayoutProvider
      navbar={<Navbar text={`${location} - ${nodeId} - ${sprinkler?.name}`} />}>
      <Typography
        variant="body-medium"
        text={`Aktualny status zraszacza to: ${status ? 'Włączony' : 'Wyłączony'
          }`}
      />
      {status ? (
        <Button text="Wyłącz" hasFullWidth onPress={handleSprinklerOff} />
      ) : (
        <Button text="Włącz" hasFullWidth onPress={handleSprinklerOn} />
      )}
      <TurnOnSprinklerSelect
        sprinklerBaseParams={route.params}
        sprinklerSchedule={sprinkler.schedule}
      />
    </LayoutProvider>
  );
};
