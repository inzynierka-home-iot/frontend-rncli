import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  separatingElement: {
    marginVertical: theme.spacing(2),
  },
  reload: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
});
