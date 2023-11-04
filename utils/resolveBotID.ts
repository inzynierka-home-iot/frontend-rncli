import { SaveStoredValue } from './EncryptedStorage';
import { BOT_NAME } from './env';
import { resolveUserID } from './resolveUserID';

export const resolveBotID = async () => {
  const { access_hash, id } = await resolveUserID(BOT_NAME);
  SaveStoredValue('bot_conversation_access_hash', access_hash);
  SaveStoredValue('bot_user_id', id);
};
