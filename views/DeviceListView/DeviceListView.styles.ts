import { StyleSheet } from 'react-native';
import { theme } from '../../.storybook/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing(5),
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing(7),
  },
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
