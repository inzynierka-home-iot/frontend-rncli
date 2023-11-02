import { sendIoTMessage } from './sendIoTMessage';

type SendAPIRequestFunction = (params: {
  location: string;
  nodeId: string;
  deviceId: string;
  action: string;
  additionalParams?: Object | string;
  botHash: string | null;
  botId: string | null;
}) => Promise<any>;

export const sendAPIRequest: SendAPIRequestFunction = ({
  location,
  nodeId,
  deviceId,
  action,
  additionalParams = {},
  botHash,
  botId,
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
    );
  }
  return Promise.resolve();
};
