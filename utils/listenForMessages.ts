import { ReadStoredValue } from './EncryptedStorage';
import { mtproto } from './mtprotoClient';

export const listenForMessages = async (
  setReceivedMessage: (msg: string) => void,
) => {
  const user_id = await ReadStoredValue('user_id');

  mtproto.updates.on(
    'updateShortMessage',
    (updateInfo: { message: string; user_id: string }) => {
      if (updateInfo.user_id == user_id) setReceivedMessage(updateInfo.message);
    },
  );
};
