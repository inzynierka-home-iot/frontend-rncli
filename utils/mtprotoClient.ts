import { TextEncoder, TextDecoder } from 'web-encoding';
import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

import MTProto from '@mtproto/core/envs/browser';
import { ReadStoredValue, SaveStoredValue } from './EncryptedStorage';
import { API_ID, API_HASH } from './env';

polyfillGlobal('TextEncoder', () => TextEncoder);
polyfillGlobal('TextDecoder', () => TextDecoder);

class CustomStorage {
  set(key: string, value: string) {
    return SaveStoredValue(key, value);
  }

  get(key: string) {
    return ReadStoredValue(key);
  }
}
const storage = new CustomStorage();

export const mtproto = new MTProto({
  api_id: API_ID,
  api_hash: API_HASH,
  storageOptions: {
    instance: storage,
  },
});
