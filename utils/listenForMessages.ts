import { setTempHistory } from '../redux/currentTempSensorSlice';
import {
  setInitialDevice,
  addDevice,
  removeDevice,
  setDeviceValues,
} from '../redux/devicesSlice';
import { AppDispatch } from '../redux/store';
import { Message } from '../types';
import { mtproto } from './mtprotoClient';

const paramsToObject = (params: string) => {
  const paramsList = params.split('&');
  const paramObj: any = {};
  for (let param of paramsList) {
    const [key, value] = param.split('=');
    paramObj[key] = value;
  }
  return paramObj;
};

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
        } else if (command === 'set' || command === 'status') {
          let values = message.res;
          if (command === 'set') {
            if (message.res.status) {
              values = paramsToObject(message.req.split('?')[1]);
            }
          }
          dispatch(
            setDeviceValues({
              location,
              nodeId,
              deviceId,
              values,
            }),
          );
        } else if (command === 'statusAll') {
          dispatch(setTempHistory(message.res.V_TEMP));
        } else if (command === 'connected') {
          dispatch(addDevice(message.res.device));
        } else if (command === 'disconnected') {
          dispatch(removeDevice(message.res.device));
        }
      }
    },
  );
};
