import { useEffect, useState } from 'react';
import { sendIoTMessage } from './sendIoTMessage';
import { ReadStoredValue } from './EncryptedStorage';

export type Device = {
  location: string;
  id: string;
  node: string;
  type: string;
  name: string;
};

export const getAvailableDevices = async (): Promise<Device[]> => {
  const hash = await ReadStoredValue('bot_conversation_access_hash');
  const id = await ReadStoredValue('bot_user_id');

  if (hash && id) {
    return await sendIoTMessage('*/*/*/get', hash, id);
  }

  return [];
};
