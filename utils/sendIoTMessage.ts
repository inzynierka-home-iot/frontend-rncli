import { AppDispatch } from '../redux/store';
import { hasErrorMessage } from './hasErrorMessage';
import { mtproto } from './mtprotoClient';
import { raiseTelegramError } from './raiseTelegramError';

export const sendIoTMessage = async (
  message: string,
  access_hash: string,
  user_id: string,
  dispatch: AppDispatch,
) => {
  try {
    return await mtproto.call('messages.sendMessage', {
      clear_draft: true,
      peer: {
        _: 'inputPeerUser',
        user_id,
        access_hash,
      },
      message,
      random_id:
        Math.ceil(Math.random() * 0xffffff) +
        Math.ceil(Math.random() * 0xffffff),
    });
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message, dispatch);
    }
  }
};
