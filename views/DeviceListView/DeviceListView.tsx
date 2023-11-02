import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { getDeviceIcon, sendAPIRequest } from '../../utils';
import { Device } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectDevices,
  selectDevicesLoading,
  startLoading,
} from '../../redux/devicesSlice';
import { logoutFromTelegram } from '../../utils';
import {
  useAppNavigation,
  useInitialDevices,
  useListenForHomeBotMessages,
  useResolveBotData,
} from '../../hooks';
import {
  Button,
  ButtonProps,
  ListItem,
  Navbar,
  Typography,
} from '../../.storybook/stories';
import { styles } from './DeviceListView.styles';
import { getDeviceViewName } from './utils';
import { LoadingWrapper } from '../../components/LoadingWrapper';

const createDeviceKey = (device: Device) =>
  device.location + '/' + device.nodeId + '/' + device.id;

const createSeparatingElement = () => <View style={styles.separatingElement} />;

export const DeviceListView = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const devices = useAppSelector(selectDevices);
  const loading = useAppSelector(selectDevicesLoading);

  const [botId, botHash] = useResolveBotData();
  useInitialDevices(botId, botHash);
  useListenForHomeBotMessages(botId);

  const handleLogout = useCallback(() => {
    logoutFromTelegram(navigation);
  }, [navigation]);

  const reloadDevices = () => {
    dispatch(startLoading());
    sendAPIRequest({
      location: '*',
      nodeId: '*',
      deviceId: '*',
      action: 'get',
      botHash,
      botId,
    });
  };

  const createDeviceElement = (device: Device) => (
    <ListItem
      text={device.name}
      icon={getDeviceIcon(device.type)}
      onPress={() => {
        navigation.navigate(getDeviceViewName(device.type), {
          location: device.location,
          nodeId: device.nodeId,
          deviceId: device.id,
          botHash,
          botId,
        });
      }}
    />
  );

  const logoutButtonProps: ButtonProps = {
    text: 'Wyloguj',
    variant: 'error',
    size: 'small',
    onPress: handleLogout,
  };

  const child = !devices.length ? (
    <View style={styles.reload}>
      <Typography variant={'body-large'} text="Brak dostępnych urządzeń" />
      <Button text="Odśwież listę" size="small" onPress={reloadDevices} />
    </View>
  ) : (
    <FlatList
      style={styles.content}
      data={devices}
      renderItem={({ item: device }) => createDeviceElement(device)}
      keyExtractor={createDeviceKey}
      ItemSeparatorComponent={createSeparatingElement}
    />
  );

  return (
    <View style={styles.container}>
      <Navbar
        text="Lista urządzeń"
        button={logoutButtonProps}
        backButton={false}
      />
      <LoadingWrapper isLoading={loading}>{child}</LoadingWrapper>
    </View>
  );
};
