import { SaveStoredValue } from './EncryptedStorage';
import { BOT_NAME } from './env';
import { mtproto } from './mtprotoClient';

export const resolveBotID = async () => {
  const res = await mtproto.call('contacts.resolveUsername', {
    username: BOT_NAME,
  });
  console.log('SEEE');
  const { access_hash, id } = res.users[0];
  SaveStoredValue('bot_conversation_access_hash', access_hash);
  SaveStoredValue('bot_user_id', id);
};
