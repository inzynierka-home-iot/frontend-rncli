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
    (updateInfo: { message: Message; user_id: string }) => {
      if (updateInfo.user_id === user_id) {
        setReceivedMessage(updateInfo.message.res);
        // TODO set devices when we get proper response
        if (updateInfo.message.req == '*/*/*/get') {
          dispatch(setDevices(updateInfo.message.res));
        }
      }
    },
  );
};
