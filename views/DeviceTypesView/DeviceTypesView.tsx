import React, { FC, useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  useAppNavigation,
  useInitialDevices,
  useListenForHomeBotMessages,
} from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearDeviceState,
  selectDeviceTypes,
  selectDevicesLoading,
} from '../../redux/devicesSlice';
import { getDeviceIcon, sendAPIRequest } from '../../utils';
import { Button, ListItem, Typography } from '../../.storybook/stories';
import { LayoutProvider, NavbarWithLogout } from '../../components';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { View } from 'react-native';
import { styles } from './DeviceTypesView.styles';
import { getDeviceTypeName } from './utils';

type DeviceTypesViewProps = NativeStackScreenProps<
  RootStackParamList,
  'DeviceTypes'
>;

export const DeviceTypesView: FC<DeviceTypesViewProps> = ({ route }) => {
  const { botId, botHash } = route.params;

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const types = useAppSelector(selectDeviceTypes);
  const loading = useAppSelector(selectDevicesLoading);

  useListenForHomeBotMessages(botId);
  useInitialDevices(botId, botHash);

  const sortedTypes = useMemo(
    () =>
      types.sort((a, b) =>
        getDeviceTypeName(a).localeCompare(getDeviceTypeName(b)),
      ),
    [types],
  );

  const reloadDevices = () => {
    dispatch(clearDeviceState());
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

  return (
    <LayoutProvider
      navbar={<NavbarWithLogout text="Typy urządzeń" backButton />}>
      <LoadingWrapper isLoading={loading}>
        {!types.length ? (
          <View style={styles.reload}>
            <Typography variant="body-large" text="Brak dostępnych urządzeń" />
            <Button text="Odśwież listę" size="small" onPress={reloadDevices} />
          </View>
        ) : (
          <View style={styles.typesList}>
            {sortedTypes.map(deviceType => (
              <ListItem
                key={deviceType}
                text={getDeviceTypeName(deviceType)}
                icon={getDeviceIcon(deviceType)}
                onPress={() =>
                  navigation.navigate('DeviceList', {
                    botHash,
                    botId,
                    deviceType,
                  })
                }
              />
            ))}
          </View>
        )}
      </LoadingWrapper>
    </LayoutProvider>
  );
};
