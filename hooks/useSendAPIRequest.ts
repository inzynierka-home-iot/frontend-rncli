import { useAppDispatch } from '../redux/hooks';
import { IoTAPIRequest } from '../types';
import { sendAPIRequest } from '../utils';

export const useSendAPIRequest = () => {
  const dispatch = useAppDispatch();

  const sendIoTAPIRequest = async (params: IoTAPIRequest) =>
    sendAPIRequest({
      ...params,
      dispatch,
    });

  return sendIoTAPIRequest;
};
