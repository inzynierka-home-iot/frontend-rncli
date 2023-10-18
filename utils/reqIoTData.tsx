import { sendIoTMessage } from './sendIoTMessage';
import { ReadStoredValue } from './EncryptedStorage';

export const reqIoTData = async (message: string) => {
  const hash = await ReadStoredValue('bot_conversation_access_hash');
  const id = await ReadStoredValue('bot_user_id');

  if (hash && id) {
    sendIoTMessage(message, hash, id);
  }
};
