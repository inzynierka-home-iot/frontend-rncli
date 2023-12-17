import React, { FC } from 'react';
import { View } from 'react-native';
import { getDeviceIcon } from '../../utils';
import { Device, RootStackParamList } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { selectDevicesWithType } from '../../redux/devicesSlice';
import { useAppNavigation } from '../../hooks';
import { ListItem } from '../../.storybook/stories';
import { getDeviceViewName } from './utils';
import {
  ControlsLayout,
  LayoutProvider,
  NavbarWithLogout,
} from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdditionalControls } from './components';
import { styles } from './DeviceListView.styles';

const createDeviceKey = (device: Device) =>
  device.location + '/' + device.nodeId + '/' + device.id;

export type DeviceListViewProps = NativeStackScreenProps<
  RootStackParamList,
  'DeviceList'
>;

export const DeviceListView: FC<DeviceListViewProps> = ({ route }) => {
  const { botId, botHash, deviceType } = route.params;

  const navigation = useAppNavigation();

  const devices = useAppSelector(state =>
    selectDevicesWithType(state, deviceType),
  );

  return (
    <LayoutProvider
      navbar={<NavbarWithLogout text="Lista urządzeń" backButton />}>
      <View style={styles.deviceList}>
        {devices.map(device => (
          <ListItem
            key={createDeviceKey(device)}
            text={device.name}
            icon={getDeviceIcon(device.type)}
            onPress={() =>
              navigation.navigate(getDeviceViewName(device.type), {
                location: device.location,
                nodeId: device.nodeId,
                deviceId: device.id,
                botHash,
                botId,
              })
            }
          />
        ))}
      </View>
      <ControlsLayout>
        <AdditionalControls
          deviceType={deviceType}
          botHash={botHash}
          botId={botId}
        />
      </ControlsLayout>
    </LayoutProvider>
  );
};
