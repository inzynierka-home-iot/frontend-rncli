import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../App';
import { theme } from '../../.storybook/theme';
import { Navbar } from '../../.storybook/stories/Navbar/Navbar';
import { ListItem } from '../../.storybook/stories/ListItem/ListItem';
import { useInitialDevices } from './useInitialDevices';
import { getDeviceIcon } from '../../utils/getDeviceIcon';

export const DeviceList = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const devices = useInitialDevices();

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
        renderItem={({ item: device }) => (
          <ListItem
            text={device.name}
            icon={getDeviceIcon(device.type)}
            onPress={() => {}}
          />
        )}
        keyExtractor={device =>
          device.location + '/' + device.node + '/' + device.id
        }
        ItemSeparatorComponent={() => (
          <View style={{ marginVertical: theme.spacing(2) }} />
        )}
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
});
