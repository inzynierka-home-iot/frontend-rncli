import { mtproto } from './mtprotoClient';
import {
  ReadStoredValue,
  RemoveStoredValue,
  SaveStoredValue,
} from './EncryptedStorage';
import { hasErrorMessage } from './hasErrorMessage';
import { raiseTelegramError } from './raiseTelegramError';
import { AppDispatch } from '../redux/store';

const updateFutureAuthTokens = async (token: number[]) => {
  let tokensPromise = await ReadStoredValue('FutureAuthTokens');
  if (tokensPromise) {
    let tokens = JSON.parse(tokensPromise);
    if (tokens.length >= 20) {
      tokens.shift();
    }
    tokens.push(token);
    SaveStoredValue('FutureAuthTokens', JSON.stringify(tokens));
  } else {
    SaveStoredValue('FutureAuthTokens', JSON.stringify([token]));
  }
};

export const logoutFromTelegram = async (
  navigation: any,
  dispatch: AppDispatch,
) => {
  try {
    const res = await mtproto.call('auth.logOut');
    if (res._ === 'auth.loggedOut') {
      await updateFutureAuthTokens(res.future_auth_token);
      await RemoveStoredValue('SignedIn');
      navigation.navigate('Login');
    }
    return res;
  } catch (e) {
    if (hasErrorMessage(e)) {
      raiseTelegramError(e.error_message, dispatch);
    }
    return false;
  }
};
