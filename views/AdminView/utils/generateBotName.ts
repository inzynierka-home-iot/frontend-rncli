import { BOT_NAME_RANDOM_NUMBERS } from '../../../utils/env';

const MIN = 10 ** (BOT_NAME_RANDOM_NUMBERS - 1);
const MAX = 10 ** BOT_NAME_RANDOM_NUMBERS - 1;

export const generateBotName = (locationName: string) => {
  const randomNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  return locationName + '_' + randomNumber;
};
