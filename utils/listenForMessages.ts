import { setDevices } from '../redux/devicesSlice';
import { AppDispatch } from '../redux/store';
import { Message } from '../types';
import { mtproto } from './mtprotoClient';

export const listenForMessages = async (
  setReceivedMessage: (msg: string) => void,
  user_id: string,
  dispatch: AppDispatch,
) => {
  mtproto.updates.on(
    'updateShortMessage',
    (updateInfo: { message: string; user_id: string }) => {
      if (updateInfo.user_id === user_id) {
        const message: Message = JSON.parse(updateInfo.message);
        setReceivedMessage(message.res);
        if (message.req == '*/*/*/get') {
          dispatch(setDevices(message.res));
        }
      }
    },
  );
};
