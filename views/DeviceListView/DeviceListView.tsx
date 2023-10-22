import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { getDeviceIcon } from '../../utils/getDeviceIcon';
import { Device } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { selectDevices } from '../../redux/devicesSlice';
import { logoutFromTelegram } from '../../utils';
import {
  useAppNavigation,
  useInitialDevices,
  useListenForHomeBotMessages,
  useResolveBotData,
} from '../../hooks';
import { ListItem, Navbar } from '../../.storybook/stories';
import { styles } from './DeviceListView.styles';

const createDeviceElement = (device: Device) => (
  <ListItem
    text={device.name}
    icon={getDeviceIcon(device.type)}
    onPress={() => { }}
  />
);

const createDeviceKey = (device: Device) =>
  device.location + '/' + device.nodeId + '/' + device.id;

const createSeparatingElement = () => <View style={styles.separatingElement} />;

export const DeviceListView = () => {
  const navigation = useAppNavigation();

  const { devices } = useAppSelector(selectDevices);

  const [botId, botHash] = useResolveBotData();
  useInitialDevices(botId, botHash);
  useListenForHomeBotMessages(botId);

  const handleLogout = useCallback(() => {
    logoutFromTelegram(navigation);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Navbar
        text="Lista urządzeń"
        buttons={[
          {
            text: 'Wyloguj',
            variant: 'error',
            size: 'small',
            onPress: handleLogout,
          },
        ]}
      />
      <FlatList
        style={styles.content}
        data={devices}
        renderItem={({ item: device }) => createDeviceElement(device)}
        keyExtractor={createDeviceKey}
        ItemSeparatorComponent={createSeparatingElement}
      />
    </View>
  );
};
