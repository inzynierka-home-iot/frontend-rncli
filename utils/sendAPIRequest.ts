import { sendIoTMessage } from './sendIoTMessage';

type SendAPIRequestFunciton = (params: {
  location: string;
  nodeId: string;
  deviceId: string;
  action: string;
  additionalParams?: string;
  botHash: string;
  botId: string;
}) => Promise<any>;

export const sendAPIRequest: SendAPIRequestFunciton = ({
  location,
  nodeId,
  deviceId,
  action,
  additionalParams = '',
  botHash,
  botId,
}) =>
  sendIoTMessage(
    `/${location}/${nodeId}/${deviceId}/${action}/${additionalParams ? `?${additionalParams}` : ''
    }`,
    botHash,
    botId,
  );
