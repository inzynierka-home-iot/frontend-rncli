import { useEffect } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { listenForBotFatherMessages } from '../../../utils';

export const useListenForBotFather = (userId: string | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      const removeListener = listenForBotFatherMessages(userId, dispatch);
      return removeListener;
    }
  }, [userId, dispatch]);
};
