import { ReadStoredValue } from './EncryptedStorage';
import { hasErrorMessage } from './hasErrorMessage';
import { mtproto } from './mtprotoClient';
import { raiseTelegramError } from './raiseTelegramError';

export const sendVerificationCode = async (
  phone_number: string,
): Promise<{ success: boolean; res: any }> => {
  try {
    const storedTokens = await ReadStoredValue('FutureAuthTokens');
    const logout_tokens = storedTokens ? JSON.parse(storedTokens) : [];
    let tokens: any[][] = [];
    logout_tokens.forEach((arr: any[]) => {
      tokens.push(Object.values(arr));
    });
    const res = await mtproto.call('auth.sendCode', {
      phone_number,
      settings: {
        _: 'codeSettings',
        flags: 6,
        logout_tokens: tokens,
      },
    });
    return { success: true, res };
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message);
    }

    return { success: false, res: {} };
  }
};
