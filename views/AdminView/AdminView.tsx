import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Navbar } from '../../.storybook/stories';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { sendIoTMessage } from '../../utils';
import { styles } from './AdminViewStyles';
import { LocationInput } from './components';
import { BotNameInput } from './components/BotNameInput';
import { BotTokenLabel } from './components/BotTokenLabel';
import { useBotFatherId, useListenForBotFather } from './hooks';

export const AdminView = () => {
  const [botFatherAccessHash, botFatherId] = useBotFatherId();
  useListenForBotFather(botFatherId);

  useEffect(() => {
    if (botFatherAccessHash && botFatherId) {
      sendIoTMessage('/newbot', botFatherAccessHash, botFatherId);
    }
  }, [botFatherAccessHash, botFatherId]);

  return (
    <View style={styles.container}>
      <Navbar text="Dodaj nową lokalizację" />
      <LoadingWrapper isLoading={!botFatherAccessHash || !botFatherId}>
        <View style={styles.content}>
          <LocationInput
            botFatherAccessHash={botFatherAccessHash!}
            botFatherId={botFatherId!}
          />
          <BotNameInput
            botFatherAccessHash={botFatherAccessHash!}
            botFatherId={botFatherId!}
          />
          <BotTokenLabel />
        </View>
      </LoadingWrapper>
    </View>
  );
};
