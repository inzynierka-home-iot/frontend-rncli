import { SaveStoredValue } from './EncryptedStorage';
import { BOT_NAME } from '@env';
import { mtproto } from './mtprotoClient';

export const storeUserID = async () => {
  const res = await mtproto.call('contacts.resolveUsername', {
    username: BOT_NAME,
  });
  const { access_hash, id } = res.users[0];
  SaveStoredValue('access_hash', access_hash);
  SaveStoredValue('user_id', id);
};
