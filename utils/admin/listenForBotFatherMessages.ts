import {
  setNewBotToken,
  setIsWaitingForUsername,
  setIsWaitingForName,
  setIsUsernameTakenError,
  setIsUsernameInvalidError,
} from '../../redux/adminSlice';
import { AppDispatch } from '../../redux/store';
import { mtproto } from '../mtprotoClient';

const newBotResponse =
  'Alright, a new bot. How are we going to call it? Please choose a name for your bot.';

const provideIdResponse =
  "Good. Now let's choose a username for your bot. It must end in `bot`. Like this, for example: TetrisBot or tetris_bot.";

const createBotNameTakenError =
  'Sorry, this username is already taken. Please try something different.';

const createBotNameInvalidError = 'Sorry, this username is invalid.';

const createBotSuccess = 'Done! Congratulations on your new bot.';

const hashStart = 'Use this token to access the HTTP API:';
const hashEnd = 'Keep your token secure and store it safely';

export const listenForBotFatherMessages = (
  user_id: string,
  dispatch: AppDispatch,
) => {
  const onUpdate = (updateInfo: {
    users: { id: string }[];
    updates: {
      message: { message: string; reply_markup: any };
    }[];
  }) => {
    const users = updateInfo.users.map(({ id }) => id);
    if (users.includes(user_id)) {
      const messages = updateInfo.updates.map(({ message }) => message.message);
      if (messages.includes(newBotResponse)) {
        dispatch(setIsWaitingForName(true));
      }
      if (messages.includes(provideIdResponse)) {
        dispatch(setIsWaitingForName(false));
        dispatch(setIsWaitingForUsername(true));
      }
      if (messages.includes(createBotNameTakenError)) {
        dispatch(setIsUsernameTakenError(true));
        dispatch(setIsUsernameInvalidError(false));
      }
      if (messages.includes(createBotNameInvalidError)) {
        dispatch(setIsUsernameInvalidError(true));
        dispatch(setIsUsernameTakenError(false));
      }
      const successMessage = messages.find(message =>
        message.includes(createBotSuccess),
      );
      if (successMessage) {
        dispatch(setIsWaitingForName(false));
        dispatch(setIsWaitingForUsername(false));
        dispatch(setIsUsernameInvalidError(false));
        dispatch(setIsUsernameTakenError(false));
        const messageWithHashStart = successMessage.split(hashStart)[1];
        const hash = messageWithHashStart.split(hashEnd)[0];
        dispatch(setNewBotToken(hash));
      }
    }
  };

  mtproto.updates.on('updates', onUpdate);

  return () => mtproto.updates.off('updates', onUpdate);
};
