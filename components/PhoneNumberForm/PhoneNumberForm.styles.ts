import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  provideData: {
    gap: theme.spacing(6),
  },
  inputs: {
    flexDirection: 'row',
    gap: theme.spacing(4),
  },
  diallingCode: {
    flex: 1,
  },
  phoneNumber: {
    flex: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
