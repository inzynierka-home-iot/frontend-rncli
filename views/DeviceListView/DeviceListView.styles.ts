import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  reload: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  deviceList: {
    gap: theme.spacing(3),
  },
});
