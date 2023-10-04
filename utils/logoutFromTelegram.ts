import { mtproto } from './mtprotoClient';
import { ClearStorage } from './EncryptedStorage';
import { hasErrorMessage } from './hasErrorMessage';
import { raiseTelegramError } from './raiseTelegramError';

export const logoutFromTelegram = async (navigation: any) => {
  try {
    const res = await mtproto.call('auth.logOut');
    if (res) {
      ClearStorage();
      navigation.replace('SignIn');
    }
    return res;
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message);
    }
    return false;
  }
};
