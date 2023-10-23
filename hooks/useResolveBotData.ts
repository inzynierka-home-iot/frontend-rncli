import { useState } from 'react';
import { ReadStoredValue } from '../utils';

export const useResolveBotData = () => {
  const [botAccessHash, setBotAccessHash] = useState<string | null>(null);
  const [botId, setBotId] = useState<string | null>(null);

  ReadStoredValue('bot_conversation_access_hash').then(res =>
    setBotAccessHash(res),
  );
  ReadStoredValue('bot_user_id').then(res => setBotId(res));

  return [botId, botAccessHash];
};
