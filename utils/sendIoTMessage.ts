import { mtproto } from './mtprotoClient';

export const sendIoTMessage = async (message: string) => {
  try {
    const res = await mtproto.call('contacts.resolveUsername', {
      username: 'homeiotinzynierka_bot',
    });
    const { access_hash, id } = res.users[0];
    return await mtproto.call('messages.sendMessage', {
      clear_draft: true,
      peer: {
        _: 'inputPeerUser',
        user_id: id,
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
