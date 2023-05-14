import { TextEncoder, TextDecoder } from 'web-encoding';
import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

import MTProto from '@mtproto/core/envs/browser';

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

export const connect = async () => {
  try {
    const res = await mtproto.call('help.getNearestDc');
    await mtproto.setDefaultDc(res.nearest_dc);
    return '3124312';
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
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const sendIOTMessage = async (message: string) => {
  try {
    // TODO add channel_id and access_hash to the iot bot channel
    // const res = await mtproto.call('messages.sendMessage', {
    //   clear_draft: true,
    //   peer: {
    //     _: 'inputPeerChannel',
    //     channel_id: ,
    //     access_hash: ,
    //   },
    //   message,
    //   random_id:
    //     Math.ceil(Math.random() * 0xffffff) +
    //     Math.ceil(Math.random() * 0xffffff),
    // });
    // console.log(res);
    // return res;
  } catch (e) {
    console.log(e);
  }
};
