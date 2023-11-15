import { FC } from 'react';
import {
  AlertMessage,
  removeAlert,
  selectAlerts,
} from '../../redux/alertsSlice';
import { AlertBanner } from '../../.storybook/stories';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { styles } from './Alerts.styles';

export const Alerts: FC = ({}) => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectAlerts);

  const handleCloseAlertBanner = (alert: AlertMessage) =>
    dispatch(removeAlert(alert));

  return (
    <View style={styles.container}>
      {alerts.map(alert => (
        <AlertBanner
          key={`alertBanner#${alert.id}`}
          text={alert.text}
          variant={alert.variant}
          isOpen
          onClose={() => handleCloseAlertBanner(alert)}
        />
      ))}
    </View>
  );
};
