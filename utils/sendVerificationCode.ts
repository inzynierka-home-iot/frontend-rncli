import { mtproto } from './mtprotoClient';

export const sendVerificationCode = async (
  phone_number: string,
): Promise<false | { phone_code_hash: string }> => {
  try {
    return await mtproto.call('auth.sendCode', {
      phone_number,
      settings: {
        _: 'codeSettings',
      },
    });
  } catch (e) {
    console.error(e);
    return false;
  }
};
