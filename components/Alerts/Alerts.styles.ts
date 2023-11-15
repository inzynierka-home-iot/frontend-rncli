import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: theme.spacing(2),
    gap: theme.spacing(1),
  },
});
