import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { getDeviceIcon, sendAPIRequest } from '../../utils';
import { Device } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { selectDevices, selectReload } from '../../redux/devicesSlice';
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
import { Loading } from '../../.storybook/stories/Loading';

const createDeviceKey = (device: Device) =>
  device.location + '/' + device.nodeId + '/' + device.id;

const createSeparatingElement = () => <View style={styles.separatingElement} />;

export const DeviceListView = () => {
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(true);
  const [enableLoadingStateChange, setEnableLoadingStateChange] =
    useState(false);

  const devices = useAppSelector(selectDevices);
  const reload = useAppSelector(selectReload);

  const [botId, botHash] = useResolveBotData();
  useInitialDevices(botId, botHash);
  useListenForHomeBotMessages(botId);

  const handleLogout = useCallback(() => {
    logoutFromTelegram(navigation);
  }, [navigation]);

  const reloadDevices = () => {
    setLoading(true);
    if (botId && botHash) {
      sendAPIRequest({
        location: '*',
        nodeId: '*',
        deviceId: '*',
        action: 'get',
        botHash,
        botId,
      });
    }
  };

  useEffect(() => {
    if (!enableLoadingStateChange) {
      setEnableLoadingStateChange(true);
      return;
    }
    setLoading(false);
  }, [devices]);

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

  const reloadButtonProps: ButtonProps = {
    text: 'Odśwież listę',
    size: 'small',
    onPress: reloadDevices,
  };

  return (
    <View style={styles.container}>
      <Navbar
        text="Lista urządzeń"
        button={logoutButtonProps}
        backButton={false}
      />
      {loading ? (
        <Loading />
      ) : reload ? (
        <View style={styles.reload}>
          <Typography
            variant={'body-large'}
            text={'Brak dostępnych urządzeń'}
          />
          <Button {...reloadButtonProps} />
        </View>
      ) : (
        <FlatList
          style={styles.content}
          data={devices}
          renderItem={({ item: device }) => createDeviceElement(device)}
          keyExtractor={createDeviceKey}
          ItemSeparatorComponent={createSeparatingElement}
        />
      )}
    </View>
  );
};
