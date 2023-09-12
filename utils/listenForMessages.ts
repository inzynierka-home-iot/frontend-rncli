import { mtproto } from './mtprotoClient';

export const listenForMessages = (
  setReceivedMessage: (msg: string) => void,
) => {
  mtproto.updates.on(
    'updateShortMessage',
    (updateInfo: { message: string }) => {
      setReceivedMessage(updateInfo.message);
    },
  );
};
