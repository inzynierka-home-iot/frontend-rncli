import { useEffect } from 'react';
import { sendIoTMessage } from '../utils';

export const useInitialDevices = (
  botId: string | null,
  botAccessHash: string | null,
) => {
  useEffect(() => {
    if (botId && botAccessHash) {
      sendIoTMessage('/*/*/*/get/', botAccessHash, botId);
    }
  }, [botId, botAccessHash]);
};
