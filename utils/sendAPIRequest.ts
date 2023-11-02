import { sendIoTMessage } from './sendIoTMessage';

type SendAPIRequestFunction = (params: {
  location: string;
  nodeId: string;
  deviceId: string;
  action: string;
  additionalParams?: Object;
  botHash: string;
  botId: string;
}) => any;

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

  sendIoTMessage(
    `/${location}/${nodeId}/${deviceId}/${action}/${params ? `?${params}` : ''
    }`,
    botHash,
    botId,
  );
};
