import { mtproto } from './mtprotoClient';

export const logIn2FA = async (
  phone_number: string,
  phone_code_hash: string,
  phone_code: string,
) => {
  try {
    return await mtproto.call(
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
  } catch (e) {
    console.log(e);
    return false;
  }
};
