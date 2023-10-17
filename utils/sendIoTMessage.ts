import { mtproto } from './mtprotoClient';

export const sendIoTMessage = async (
  message: string,
  access_hash: string,
  user_id: string,
) => {
  try {
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
