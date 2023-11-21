import { AppDispatch } from '../redux/store';
import { sendIoTMessage } from './sendIoTMessage';

type SendAPIRequestFunction = (params: {
  location: string;
  nodeId: string;
  deviceId: string;
  action: string;
  additionalParams?: string;
  botHash: string | null;
  botId: string | null;
  dispatch: AppDispatch;
}) => Promise<any>;

export const sendAPIRequest: SendAPIRequestFunction = ({
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
