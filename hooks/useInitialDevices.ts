import { useEffect } from 'react';
import { sendAPIRequest } from '../utils';

export const useInitialDevices = (
  botId: string | null,
  botAccessHash: string | null,
) => {
  useEffect(() => {
    sendAPIRequest({
      location: '*',
      nodeId: '*',
      deviceId: '*',
      action: 'get',
      botHash: botAccessHash,
      botId,
    });
  }, [botId, botAccessHash]);
};
