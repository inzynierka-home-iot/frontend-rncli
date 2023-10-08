import { hasErrorMessage } from './hasErrorMessage';
import { mtproto } from './mtprotoClient';
import { raiseTelegramError } from './raiseTelegramError';

export const logIn2FA = async (
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
    console.log(res);
    return res;
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message);
    }
    return false;
  }
};
