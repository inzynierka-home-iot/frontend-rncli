import {
  setInitialDevice,
  addDevice,
  removeDevice,
  setDeviceValues,
} from '../redux/devicesSlice';
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
        const [_, location, nodeId, deviceId, command] = message.req.split('/');
        if (message.req === '/*/*/*/get/') {
          dispatch(setInitialDevice(message.res));
        }
        if (command === 'set') {
          dispatch(
            setDeviceValues({
              location,
              nodeId,
              deviceId,
              values: message.res.values,
            }),
          );
        }
        if (command === 'connected') {
          dispatch(addDevice(message.res.device));
        }
        if (command === 'disconnected') {
          dispatch(removeDevice(message.res.device));
        }
      }
    },
  );
};
