import { AppDispatch } from '../redux/store';
import { hasErrorMessage } from './hasErrorMessage';
import { mtproto } from './mtprotoClient';
import { raiseTelegramError } from './raiseTelegramError';

export const sendVerificationCode = async (
  phone_number: string,
  dispatch: AppDispatch,
): Promise<{ success: boolean; res: any }> => {
  try {
    const res = await mtproto.call('auth.sendCode', {
      phone_number,
      settings: {
        _: 'codeSettings',
        flags: 6,
      },
    });
    return { success: true, res };
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message, dispatch);
    }

    return { success: false, res: {} };
  }
};
