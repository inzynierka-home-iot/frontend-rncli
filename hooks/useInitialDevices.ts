import { useEffect } from 'react';
import { clearState } from '../redux/devicesSlice';
import { useAppDispatch } from '../redux/hooks';
import { sendAPIRequest } from '../utils';

export const useInitialDevices = (
  botId: string | null,
  botAccessHash: string | null,
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearState());
    sendAPIRequest({
      location: '*',
      nodeId: '*',
      deviceId: '*',
      action: 'get',
      botHash: botAccessHash,
      botId,
      dispatch,
    });
  }, [botId, botAccessHash, dispatch]);
};
