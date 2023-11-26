import { AppDispatch } from '../redux/store';
import { IoTAPIRequest } from '../types';
import { sendIoTMessage } from './sendIoTMessage';

type SendAPIRequestFunction = (
  params: IoTAPIRequest & {
    dispatch: AppDispatch;
  },
) => Promise<any>;

export const sendAPIRequest: SendAPIRequestFunction = ({
  location,
  nodeId,
  deviceId,
  action,
  additionalParams = {},
  botHash,
  botId,
  dispatch,
}) => {
  const isParamsString = typeof additionalParams === 'string';
  const params = isParamsString
    ? additionalParams
    : Object.entries(additionalParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  if (botId && botHash) {
    return sendIoTMessage(
      `/${location}/${nodeId}/${deviceId}/${action}/${params ? `?${params}` : ''
      }`,
      botHash,
      botId,
      dispatch,
    );
  }
  return Promise.resolve();
};
