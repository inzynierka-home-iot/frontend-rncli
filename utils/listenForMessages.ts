import { setTempHistory } from '../redux/currentTempSensorSlice';
import {
  setInitialDevice,
  addDevice,
  removeDevice,
  setDevicesValues,
  setDeviceSchedule,
} from '../redux/devicesSlice';
import { addAlert } from '../redux/alertsSlice';
import { AppDispatch } from '../redux/store';
import { Alert, Message } from '../types';
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

const getChangedParams = (req: string) => {
  const changedParamsWithValues = req.split('?')[1].split('&');
  const changedParams = changedParamsWithValues.map(
    paramWithValue => paramWithValue.split('=')[0],
  );
  return changedParams;
};

export const listenForMessages = (user_id: string, dispatch: AppDispatch) => {
  const onUpdate = (updateInfo: { message: string; user_id: string }) => {
    if (updateInfo.user_id === user_id) {
      const message: Message = JSON.parse(updateInfo.message);
      const [_, location, nodeId, deviceId, command] = message.req.split('/');
      if (message.req === '/*/*/*/get/') {
        dispatch(setInitialDevice(message.res));
        const alertMessage: Alert = {
          variant: 'informative',
          text: 'Pobrano urządzenia',
        };
        dispatch(addAlert(alertMessage));
      } else if (command === 'set') {
        const values = paramsToObject(message.req.split('?')[1]);
        dispatch(
          setDevicesValues({
            location,
            nodeId,
            deviceId,
            values,
          }),
        );
        const changedParams = getChangedParams(message.req);
        const alertMessage: Alert = {
          variant: 'success',
          text: `Zaaktualizowane parametry: ${changedParams.join(', ')}`,
        };
        dispatch(addAlert(alertMessage));
      } else if (command === 'setSchedule') {
        const schedule = paramsToObject(message.req.split('?')[1]);
        dispatch(
          setDeviceSchedule({
            location,
            nodeId,
            deviceId,
            schedule,
          }),
        );
        const alertMessage: Alert = {
          variant: 'success',
          text: 'Zaaktualizowano schedule!',
        };
        dispatch(addAlert(alertMessage));
      } else if (command === 'status') {
        const { res: values } = message;
        dispatch(
          setDevicesValues({
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
        const alertMessage: Alert = {
          variant: 'informative',
          text: `Nowe urządzenie: ${message.res.device.name}`,
        };
        dispatch(addAlert(alertMessage));
      } else if (command === 'disconnected') {
        dispatch(removeDevice(message.res.device));
        const alertMessage: Alert = {
          variant: 'error',
          text: `Odłączono urządzenie: ${message.res.device.name}`,
        };
        dispatch(addAlert(alertMessage));
      }
    }
  };

  mtproto.updates.on('updateShortMessage', onUpdate);

  return () => mtproto.updates.off('updateShortMessage', onUpdate);
};
