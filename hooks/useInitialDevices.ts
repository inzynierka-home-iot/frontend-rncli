import { useEffect } from 'react';
import { clearDeviceState } from '../redux/devicesSlice';
import { useAppDispatch } from '../redux/hooks';
import { sendAPIRequest } from '../utils';

export const useInitialDevices = (
  botId: string | null,
  botAccessHash: string | null,
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearDeviceState());
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
