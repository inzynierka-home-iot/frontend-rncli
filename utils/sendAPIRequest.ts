import { sendIoTMessage } from './sendIoTMessage';

type SendAPIRequestFunction = (params: {
  location: string;
  nodeId: string;
  deviceId: string;
  action: string;
  additionalParams?: string;
  botHash: string | null;
  botId: string | null;
}) => Promise<any>;

export const sendAPIRequest: SendAPIRequestFunction = ({
  location,
  nodeId,
  deviceId,
  action,
  additionalParams = '',
  botHash,
  botId,
}) => {
  if (botId && botHash) {
    return sendIoTMessage(
      `/${location}/${nodeId}/${deviceId}/${action}/${additionalParams ? `?${additionalParams}` : ''
      }`,
      botHash,
      botId,
    );
  }
  return Promise.resolve();
};
