import { useEffect } from 'react';
import { sendAPIRequest } from '../utils';

export const useTempHistory = (
  location: string,
  nodeId: string,
  deviceId: string,
  botId: string | null,
  botAccessHash: string | null,
) => {
  useEffect(() => {
    if (botId && botAccessHash) {
      sendAPIRequest({
        location,
        nodeId,
        deviceId,
        action: 'statusAll',
        additionalParams: 'V_TEMP',
        botHash: botAccessHash,
        botId,
      });
    }
  }, [botId, botAccessHash]);
};
