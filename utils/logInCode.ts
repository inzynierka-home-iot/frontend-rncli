import { hasErrorMessage } from './hasErrorMessage';
import { mtproto } from './mtprotoClient';
import { raiseTelegramError } from './raiseTelegramError';

export const logInCode = async (
  phone_number: string,
  phone_code_hash: string,
  phone_code: string,
) => {
  try {
    const res = await mtproto.call(
      'auth.signIn',
      {
        phone_number,
        phone_code_hash,
        phone_code,
      },
      {
        syncAuth: false,
      },
    );
    return res;
  } catch (e) {
    if (hasErrorMessage(e)) {
      if (e.error_message === 'SESSION_PASSWORD_NEEDED') {
        return '2fa';
      } else {
        raiseTelegramError(e.error_message);
      }
    }
    return false;
  }
};
