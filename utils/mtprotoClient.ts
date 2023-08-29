import { TextEncoder, TextDecoder } from 'web-encoding';
import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

import MTProto from '@mtproto/core/envs/browser';
import { ReadStoredValue, SaveStoredValue } from './EncryptedStorage';

polyfillGlobal('TextEncoder', () => TextEncoder);
polyfillGlobal('TextDecoder', () => TextDecoder);

class CustomStorage {
  set(key: string, value: string) {
    console.log('set key:', key);
    console.log('set value:', value);
    return SaveStoredValue(key, value);
  }

  get(key: string) {
    console.log('read key:', key);
    return ReadStoredValue(key);
  }
}
const storage = new CustomStorage();

const mtproto = new MTProto({
  api_id: 22644523,
  api_hash: '66823e32a91f1719251639bb0bd5944d',
  storageOptions: {
    instance: storage,
  },
});

export const connect = async () => {
  try {
    // const res = await mtproto.call('help.getNearestDc');
    await mtproto.setDefaultDc(4);
    storage.get('signedIn');
    return 'ee';
  } catch (e) {
    console.error(e);
  }
};

export const sendVerificationCode = async (
  phoneNumber: string,
  isWorking: Function,
) => {
  try {
    isWorking(true);
    const res = await mtproto.call('auth.sendCode', {
      phone_number: phoneNumber,
      settings: {
        _: 'codeSettings',
      },
    });
    if (res) {
      isWorking(false);
    }

    return res;
  } catch (e) {
    isWorking(false);
    console.error(e);
  }
};

export const logIn2FA = async (
  phoneNumber: string,
  phoneCodeHash: string,
  phoneCode: string,
) => {
  try {
    const res = await mtproto.call(
      'auth.signIn',
      {
        phone_number: phoneNumber,
        phone_code_hash: phoneCodeHash,
        phone_code: phoneCode,
      },
      {
        syncAuth: false,
      },
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const sendIOTMessage = async (message: string) => {
  try {
    const res = await mtproto.call('contacts.resolveUsername', {
      username: 'homeiotinzynierka_bot',
    });
    const { access_hash, id } = res.users[0];
    const sendMessageResponse = await mtproto.call('messages.sendMessage', {
      clear_draft: true,
      peer: {
        _: 'inputPeerUser',
        user_id: id,
        access_hash,
      },
      message,
      random_id:
        Math.ceil(Math.random() * 0xffffff) +
        Math.ceil(Math.random() * 0xffffff),
    });
    return sendMessageResponse;
  } catch (e) {
    console.log(e);
  }
};
