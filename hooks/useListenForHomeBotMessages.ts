import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { listenForMessages } from '../utils';

export const useListenForHomeBotMessages = (botId: string | null) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (botId) {
      const { add, remove } = listenForMessages(botId, dispatch);
      add();
      return () => remove();
    }
  }, [botId, dispatch]);
};
