import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../App';
import { theme } from '../../.storybook/theme';
import { Navbar } from '../../.storybook/stories/Navbar/Navbar';
import { ListItem } from '../../.storybook/stories/ListItem/ListItem';
import { getDeviceIcon } from '../../utils/getDeviceIcon';
import { Device } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { selectDevices } from '../../redux/devicesSlice';
import { reqIoTData } from '../../utils/reqIoTData';

const createDeviceElement = (device: Device): React.JSX.Element => {
  return (
    <ListItem
      text={device.name}
      icon={getDeviceIcon(device.type)}
      onPress={() => {}}
    />
  );
};

const createDeviceKey = (device: Device): string => {
  return device.location + '/' + device.node + '/' + device.id;
};

const createSeparatingElement = (): React.JSX.Element => {
  return <View style={styles.separatingElement} />;
};

export const DeviceList = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const devices = useAppSelector(selectDevices).devices;

  useEffect(() => {
    reqIoTData('*/*/*/get');
  }, []);

  return (
    <View style={styles.container}>
      <Navbar
        text={'Lista urządzeń'}
        buttons={[
          {
            text: 'Wyloguj',
            variant: 'error',
            size: 'small',
            onPress: () => {
              navigation.navigate('Telegram');
            },
          },
        ]}
      />
      <FlatList
        style={styles.content}
        data={devices}
        renderItem={({ item: device }) => createDeviceElement(device)}
        keyExtractor={device => createDeviceKey(device)}
        ItemSeparatorComponent={() => createSeparatingElement()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing(5),
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing(7),
  },
  separatingElement: {
    marginVertical: theme.spacing(2),
  },
});
