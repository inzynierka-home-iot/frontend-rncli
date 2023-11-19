import React, { FC, useEffect } from 'react';
import { Navbar } from '../../.storybook/stories';
import { LayoutProvider } from '../../components';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { sendIoTMessage } from '../../utils';
import { LocationInput } from './components';
import { BotNameInput } from './components/BotNameInput';
import { BotTokenLabel } from './components/BotTokenLabel';
import { useBotFatherId, useListenForBotFather } from './hooks';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type AdminViewProps = NativeStackScreenProps<RootStackParamList, 'Admin'>;

export const AdminView: FC<AdminViewProps> = ({}) => {
  const [botFatherAccessHash, botFatherId] = useBotFatherId();
  useListenForBotFather(botFatherId);

  useEffect(() => {
    if (botFatherAccessHash && botFatherId) {
      sendIoTMessage('/newbot', botFatherAccessHash, botFatherId);
    }
  }, [botFatherAccessHash, botFatherId]);

  return (
    <LayoutProvider navbar={<Navbar text="Dodaj nową lokalizację" />}>
      <LoadingWrapper isLoading={!botFatherAccessHash || !botFatherId}>
        <LocationInput
          botFatherAccessHash={botFatherAccessHash!}
          botFatherId={botFatherId!}
        />
        <BotNameInput
          botFatherAccessHash={botFatherAccessHash!}
          botFatherId={botFatherId!}
        />
        <BotTokenLabel />
      </LoadingWrapper>
    </LayoutProvider>
  );
};
