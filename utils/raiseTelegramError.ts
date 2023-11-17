import { addAlert } from '../redux/alertsSlice';
import { AppDispatch } from '../redux/store';
import { Alert } from '../types';

const customData = require('./telegramErrors.json');

export const raiseTelegramError = (
  error_message: string,
  dispatch: AppDispatch,
) => {
  const message = customData.descriptions[error_message]
    ? customData.descriptions[error_message]
    : 'Unknown error';
  const alertMessage: Alert = {
    variant: 'error',
    text: message,
  };
  dispatch(addAlert(alertMessage));
};
