import { useAppDispatch } from '../redux/hooks';
import { sendIoTMessage } from '../utils';

export const useSendTelegramMessage = () => {
  const dispatch = useAppDispatch();

  const sendTelegramMessage = async (
    message: string,
    access_hash: string,
    user_id: string,
  ) => sendIoTMessage(message, access_hash, user_id, dispatch);

  return sendTelegramMessage;
};
