import { mtproto } from './mtprotoClient';
import { RemoveStoredValue } from './EncryptedStorage';
import { hasErrorMessage } from './hasErrorMessage';
import { raiseTelegramError } from './raiseTelegramError';
import { AppDispatch } from '../redux/store';
import { RootNavigationProps } from '../types';
import { resetAdmin } from '../redux/adminSlice';
import { resetAlerts } from '../redux/alertsSlice';
import { resetTempSensor } from '../redux/currentTempSensorSlice';
import { resetDevices } from '../redux/devicesSlice';

export const logoutFromTelegram = async (
  navigation: RootNavigationProps,
  dispatch: AppDispatch,
) => {
  const resetStore = () => {
    dispatch(resetAdmin());
    dispatch(resetAlerts());
    dispatch(resetTempSensor());
    dispatch(resetDevices());
  };

  try {
    const res = await mtproto.call('auth.logOut');
    if (res._ === 'auth.loggedOut') {
      resetStore();
      await RemoveStoredValue('SignedIn');
      navigation.replace('Login');
    }
    return res;
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message, dispatch);
    }
    return false;
  }
};
