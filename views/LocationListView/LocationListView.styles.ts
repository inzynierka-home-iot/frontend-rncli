import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  container: {
    gap: theme.spacing(5),
  },
  content: {
    gap: theme.spacing(5),
    paddingHorizontal: theme.spacing(7),
  },
});
