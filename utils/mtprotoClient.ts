import { TextEncoder, TextDecoder } from 'web-encoding';
import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

import MTProto from '@mtproto/core/envs/browser';
import mitt from 'mitt';

polyfillGlobal('TextEncoder', () => TextEncoder);
polyfillGlobal('TextDecoder', () => TextDecoder);

class CustomStorage {
  data: any;
  constructor() {
    this.data = {};
  }

  set(key: any, value: any) {
    this.data[key] = value;
    return Promise.resolve();
  }

  get(key: any) {
    return Promise.resolve(this.data[key]);
  }
}

const mtproto = new MTProto({
  api_id: 22644523,
  api_hash: '66823e32a91f1719251639bb0bd5944d',

  storageOptions: {
    instance: new CustomStorage(),
  },
});

export const updateEmitter = mitt();

mtproto.updates.on('updateShortChatMessage', (updateInfo: any) => {
  console.log('updateShortChatMessage:', updateInfo);
  updateEmitter.emit('newMessage', updateInfo.message);
});

export const connect = async () => {
  try {
    // const res = await mtproto.call('help.getNearestDc');
    await mtproto.setDefaultDc(4);
    return 'ee';
  } catch (e) {
    console.error(e);
  }
};

export const sendVerificationCode = async (phoneNumber: string) => {
  try {
    const res = await mtproto.call('auth.sendCode', {
      phone_number: phoneNumber,
      settings: {
        _: 'codeSettings',
      },
    });
    return res;
  } catch (e) {
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
    console.log(res);
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
