import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing(5),
  },
  content: {
    flex: 1,
    gap: theme.spacing(5),
    paddingHorizontal: theme.spacing(7),
  },
  tempChart: {
    gap: theme.spacing(2),
  },
});
