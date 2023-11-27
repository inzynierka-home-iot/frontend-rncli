import { mtproto } from './mtprotoClient';
import { RemoveStoredValue } from './EncryptedStorage';
import { hasErrorMessage } from './hasErrorMessage';
import { raiseTelegramError } from './raiseTelegramError';
import { AppDispatch } from '../redux/store';
import { RootNavigationProps } from '../types';

export const logoutFromTelegram = async (
  navigation: RootNavigationProps,
  dispatch: AppDispatch,
) => {
  try {
    const res = await mtproto.call('auth.logOut');
    if (res._ === 'auth.loggedOut') {
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
