import { AppDispatch } from '../redux/store';
import { IoTAPIRequest } from '../types';
import { sendIoTMessage } from './sendIoTMessage';

type sendAPIRequest = (
  params: IoTAPIRequest & {
    dispatch: AppDispatch;
  },
) => Promise<any>;

export const sendAPIRequest: sendAPIRequest = ({
  location,
  nodeId,
  deviceId,
  action,
  additionalParams = '',
  botHash,
  botId,
  dispatch,
}) => {
  if (botId && botHash) {
    return sendIoTMessage(
      `/${location}/${nodeId}/${deviceId}/${action}/${
        additionalParams ? `?${additionalParams}` : ''
      }`,
      botHash,
      botId,
      dispatch,
    );
  }
  return Promise.resolve();
};
