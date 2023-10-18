import { hasErrorMessage } from './hasErrorMessage';
import { mtproto } from './mtprotoClient';
import { raiseTelegramError } from './raiseTelegramError';

export const confirm2FAPassword = async (
  password: string,
): Promise<{
  success: boolean;
  res: any;
}> => {
  try {
    const res = await mtproto.call('account.getPassword', {}, {});
    const { srp_id, current_algo, srp_B } = res;
    console.log(srp_id, current_algo, srp_B);
    const { g, p, salt1, salt2 } = current_algo;
    console.log('\n\n', g, p, salt1, salt2);

    const { A, M1 } = await mtproto.crypto.getSRPParams({
      g,
      p,
      salt1,
      salt2,
      gB: srp_B,
      password,
    });
    console.log('\n\n', A, M1);

    const checkPasswordResult = await mtproto.call('auth.checkPassword', {
      password: {
        _: 'inputCheckPasswordSRP',
        srp_id,
        A,
        M1,
      },
    });
    console.log('\n\n', checkPasswordResult);
    if (checkPasswordResult) {
      return { success: true, res: checkPasswordResult };
    } else {
      throw new Error('Cannot confirm password!');
    }
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message);
    }
    console.log(e);
    return { success: false, res: {} };
  }
};
