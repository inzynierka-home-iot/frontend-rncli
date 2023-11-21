import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { listenForBotFatherMessages } from '../../../utils';
import { useFocusEffect } from '@react-navigation/native';

export const useListenForBotFather = (userId: string | undefined) => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        const removeListener = listenForBotFatherMessages(userId, dispatch);
        return () => removeListener();
      }
    }, [userId, dispatch]),
  );
};
