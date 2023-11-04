import { setIsWaitingForId, setIsWaitingForName } from '../../redux/adminSlice';
import { AppDispatch } from '../../redux/store';
import { mtproto } from '../mtprotoClient';

const newBotResponse =
  'Alright, a new bot. How are we going to call it? Please choose a name for your bot.';

const provideIdResponse =
  "Good. Now let's choose a username for your bot. It must end in `bot`. Like this, for example: TetrisBot or tetris_bot.";

export const listenForBotFatherMessages = async (
  user_id: string,
  dispatch: AppDispatch,
) => {
  mtproto.updates.on(
    'updates',
    (updateInfo: {
      users: { id: string }[];
      updates: { message: { message: string } }[];
    }) => {
      const users = updateInfo.users.map(({ id }) => id);
      console.log(users);
      if (users.includes(user_id)) {
        const messages = updateInfo.updates.map(
          ({ message }) => message.message,
        );
        if (messages.includes(newBotResponse)) {
          dispatch(setIsWaitingForName(true));
        }
        if (messages.includes(provideIdResponse)) {
          dispatch(setIsWaitingForId(true));
        }
      }
    },
  );
};
