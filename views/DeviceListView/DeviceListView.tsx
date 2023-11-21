import React, { FC } from 'react';
import { View } from 'react-native';
import { getDeviceIcon, sendAPIRequest } from '../../utils';
import { Device, RootStackParamList } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectDevices,
  selectDevicesLoading,
  startLoading,
} from '../../redux/devicesSlice';
import {
  useAppNavigation,
  useInitialDevices,
  useListenForHomeBotMessages,
} from '../../hooks';
import { Button, ListItem, Typography } from '../../.storybook/stories';
import { styles } from './DeviceListView.styles';
import { getDeviceViewName } from './utils';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { LayoutProvider, NavbarWithLogout } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const createDeviceKey = (device: Device) =>
  device.location + '/' + device.nodeId + '/' + device.id;

type DeviceListViewProps = NativeStackScreenProps<
  RootStackParamList,
  'DeviceList'
>;

export const DeviceListView: FC<DeviceListViewProps> = ({ route }) => {
  const { botId, botHash } = route.params;

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const devices = useAppSelector(selectDevices);
  const loading = useAppSelector(selectDevicesLoading);

  useInitialDevices(botId, botHash);
  useListenForHomeBotMessages(botId);

  const reloadDevices = () => {
    dispatch(startLoading());
    sendAPIRequest({
      location: '*',
      nodeId: '*',
      deviceId: '*',
      action: 'get',
      botHash,
      botId,
      dispatch,
    });
  };

  const createDeviceElement = (device: Device) => (
    <ListItem
      key={createDeviceKey(device)}
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

  return (
    <LayoutProvider
      navbar={<NavbarWithLogout text="Lista urządzeń" backButton />}>
      <LoadingWrapper isLoading={loading}>
        {!devices.length ? (
          <View style={styles.reload}>
            <Typography variant="body-large" text="Brak dostępnych urządzeń" />
            <Button text="Odśwież listę" size="small" onPress={reloadDevices} />
          </View>
        ) : (
          <View style={styles.devicesList}>
            {devices.map(device => {
              return createDeviceElement(device);
            })}
          </View>
        )}
      </LoadingWrapper>
    </LayoutProvider>
  );
};
