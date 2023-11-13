import React, { FC, PropsWithChildren } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { styles } from './LayoutProvider.styles';
import { AlertBanner } from '../../.storybook/stories';
import { useAppSelector } from '../../redux/hooks';
import {
  AlertMessage,
  removeAlert,
  selectAlerts,
} from '../../redux/alertsSlice';
import { theme } from '../../.storybook/theme';
import { useDispatch } from 'react-redux';
import { Alerts } from '../Alerts';

type LayoutProviderProps = PropsWithChildren<{
  navbar?: JSX.Element;
}>;

export const LayoutProvider: FC<LayoutProviderProps> = ({
  navbar,
  children,
}) => {
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
      {navbar}
      <ScrollView
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>{children}</View>
      </ScrollView>
      <Alerts />
      {/* <View
        style={{
          width: '100%',
          zIndex: 1,
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: theme.spacing(2),
          gap: theme.spacing(1),
        }}>
        {alerts.map(alert => createAlert(alert))}
      </View> */}
    </View>
  );
};
