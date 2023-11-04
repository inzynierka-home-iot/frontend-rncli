import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
    paddingHorizontal: theme.spacing(7),
  },
});
