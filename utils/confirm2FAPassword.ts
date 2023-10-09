import { hasErrorMessage } from './hasErrorMessage';
import { mtproto } from './mtprotoClient';
import { raiseTelegramError } from './raiseTelegramError';

export const confirm2FAPassword = async (): Promise<{
  success: boolean;
  res: any;
}> => {
  try {
    const res = await mtproto.call('account.getPassword', {});
    console.log(res);
    return { success: true, res: res };
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message);
    }

    return { success: false, res: {} };
  }
};
