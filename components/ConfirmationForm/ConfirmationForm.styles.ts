import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing(7),
    gap: theme.spacing(5),
  },
  provideData: {
    gap: theme.spacing(6),
  },
  inputs: {
    flexDirection: 'row',
    gap: theme.spacing(4),
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
