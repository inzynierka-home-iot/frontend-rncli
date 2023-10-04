import { hasErrorMessage } from './hasErrorMessage';
import { mtproto } from './mtprotoClient';
import { raiseTelegramError } from './raiseTelegramError';

export const sendVerificationCode = async (
  phone_number: string,
): Promise<{ success: boolean; res: any; }> => {
  try {
    const res = await mtproto.call('auth.sendCode', {
      phone_number,
      settings: {
        _: 'codeSettings',
      },
    });
    return { success: true, res: res };
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message);
    }

    return { success: false, res: {} };
  }
};
