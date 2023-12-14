import React, { useEffect } from 'react';
import { Navbar, useInputValue } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { LocationInput } from './components';
import { BotNameInput } from './components/BotNameInput';
import { BotTokenLabel } from './components/BotTokenLabel';
import { useBotFatherId, useListenForBotFather } from './hooks';
import { useSendTelegramMessage } from '../../hooks';

export const AdminView = () => {
  const [locationName, onLocationNameChange] = useInputValue();
  const sendTelegramMessage = useSendTelegramMessage();
  const [botFatherAccessHash, botFatherId] = useBotFatherId();
  useListenForBotFather(botFatherId);

  useEffect(() => {
    if (botFatherAccessHash && botFatherId) {
      sendTelegramMessage('/newbot', botFatherAccessHash, botFatherId);
    }
  }, [botFatherAccessHash, botFatherId, sendTelegramMessage]);

  return (
    <LayoutProvider navbar={<Navbar text="Dodaj nową lokalizację" />}>
      <LoadingWrapper isLoading={!botFatherAccessHash || !botFatherId}>
        <LocationInput
          locationName={locationName}
          onLocationNameChange={onLocationNameChange}
          botFatherAccessHash={botFatherAccessHash!}
          botFatherId={botFatherId!}
        />
        <BotNameInput
          locationName={locationName}
          botFatherAccessHash={botFatherAccessHash!}
          botFatherId={botFatherId!}
        />
        <BotTokenLabel />
      </LoadingWrapper>
    </LayoutProvider>
  );
};
