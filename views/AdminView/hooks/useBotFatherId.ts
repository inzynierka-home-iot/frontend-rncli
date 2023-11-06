import { useEffect, useState } from 'react';
import { resolveUserID } from '../../../utils';

const BOT_FATHER_NAME = 'BotFather';

export const useBotFatherId = () => {
  const [accessHash, setAccessHash] = useState<string>();
  const [botFatherId, setBotFatherId] = useState<string>();

  useEffect(() => {
    resolveUserID(BOT_FATHER_NAME).then(({ access_hash, id }) => {
      setAccessHash(access_hash);
      setBotFatherId(id);
    });
  }, []);

  return [accessHash, botFatherId];
};
