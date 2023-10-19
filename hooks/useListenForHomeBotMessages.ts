import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { listenForMessages } from '../utils';

export const useListenForHomeBotMessages = (botId: string | null) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (botId) {
      listenForMessages(botId, dispatch);
    }
  }, [botId, dispatch]);
};
