import { useEffect, useState } from 'react';
import { connect } from '../utils';

export const useTelegramConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await connect();
      if (res) {
        setIsConnected(true);
      } else {
        setIsError(true);
      }
    })();
  }, []);

  return { isConnected, isError };
};
