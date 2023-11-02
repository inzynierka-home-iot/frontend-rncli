import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: theme.spacing(5),
    padding: theme.spacing(7),
  },
});
