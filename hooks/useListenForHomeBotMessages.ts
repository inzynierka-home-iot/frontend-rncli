import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { listenForMessages } from '../utils';

export const useListenForHomeBotMessages = (botId: string | null) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (botId) {
      const removeListener = listenForMessages(botId, dispatch);
      return removeListener;
    }
  }, [botId, dispatch]);
};
