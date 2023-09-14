import { ReadStoredValue } from './EncryptedStorage';
import { mtproto } from './mtprotoClient';

export const sendIoTMessage = async (message: string) => {
  try {
    const access_hash = await ReadStoredValue('access_hash');
    const user_id = await ReadStoredValue('user_id');

    return await mtproto.call('messages.sendMessage', {
      clear_draft: true,
      peer: {
        _: 'inputPeerUser',
        user_id,
        access_hash,
      },
      message,
      random_id:
        Math.ceil(Math.random() * 0xffffff) +
        Math.ceil(Math.random() * 0xffffff),
    });
  } catch (e) {
    console.log(e);
  }
};
