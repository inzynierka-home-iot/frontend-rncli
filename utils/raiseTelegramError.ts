import { showMessage } from 'react-native-flash-message';

const customData = require('./telegramErrors.json');

export const raiseTelegramError = (error_message: string) => {
  const message = customData.descriptions[error_message]
    ? customData.descriptions[error_message]
    : 'Unknown error';
  showMessage({
    message: message,
    type: 'danger',
  });
};
