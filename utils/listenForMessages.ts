import { setDevices } from '../redux/devicesSlice';
import { AppDispatch } from '../redux/store';
import { Message } from '../types';
import { mtproto } from './mtprotoClient';

export const listenForMessages = async (
  user_id: string,
  dispatch: AppDispatch,
) => {
  mtproto.updates.on(
    'updateShortMessage',
    (updateInfo: { message: string; user_id: string }) => {
      if (updateInfo.user_id === user_id) {
        const message: Message = JSON.parse(updateInfo.message);
        if (message.req === '/*/*/*/get/') {
          dispatch(setDevices(message.res));
        }
        // TODO handle change status of the light, when we get response from backend
      }
    },
  );
};
