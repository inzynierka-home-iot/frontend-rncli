import { FC } from 'react';
import {
  AlertMessage,
  removeAlert,
  selectAlerts,
} from '../../redux/alertsSlice';
import { AlertBanner } from '../../.storybook/stories';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../.storybook/theme';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';

export const Alerts: FC = ({}) => {
  const dispatch = useDispatch();
  const alerts = useAppSelector(selectAlerts);

  const createAlert = (alert: AlertMessage) => (
    <AlertBanner
      key={`alertBanner${alert.id}`}
      text={alert.text}
      variant={alert.variant}
      isOpen={true}
      onClose={() => {
        dispatch(removeAlert(alert));
      }}
    />
  );

  return (
    <View style={styles.container}>
      {alerts.map(alert => createAlert(alert))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: theme.spacing(2),
    gap: theme.spacing(1),
  },
});
