import { FC, useCallback } from 'react';
import React from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, ListItem, Typography } from '../../.storybook/stories';
import { LayoutProvider, NavbarWithLogout } from '../../components';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { useAppNavigation, useBotsNames, useSendIotMessage } from '../../hooks';
import { useBotFatherId, useListenForBotFather } from '../AdminView/hooks';

export const LocationListView: FC = () => {
  const [botFatherAccessHash, botFatherId] = useBotFatherId();
  useListenForBotFather(botFatherId);
  const { isLoading, botsAvailable, locationCredentials, startRetrieving } =
    useBotsNames();
  const sendTelegramMessage = useSendIotMessage();
  const navigation = useAppNavigation();

  const onNavigateToAdmin = () => {
    navigation.navigate('Admin');
  };

  const onNavigateToDeviceList = (botHash: string, botId: string) => {
    navigation.navigate('DeviceList', {
      botHash,
      botId,
    });
  };

  const retrieveAvailableLocations = () => {
    if (botFatherAccessHash && botFatherId) {
      startRetrieving();
      sendTelegramMessage('/mybots', botFatherAccessHash, botFatherId);
    }
  };

  useFocusEffect(
    useCallback(() => {
      retrieveAvailableLocations();
    }, [botFatherAccessHash, botFatherId]),
  );

  return (
    <LayoutProvider navbar={<NavbarWithLogout text="Lista lokalizacji" />}>
      <LoadingWrapper isLoading={isLoading}>
        {!botsAvailable ? (
          <Typography variant="header-medium" text="Brak podpiętych botów" />
        ) : locationCredentials?.length ? (
          locationCredentials.map(({ access_hash, id, first_name }) => (
            <ListItem
              text={first_name}
              key={id}
              onPress={() => onNavigateToDeviceList(access_hash, id)}
            />
          ))
        ) : (
          <Typography variant="header-medium" text="Brak zapisanych lokacji" />
        )}
        <Button text="Stwórz nową lokalizację" onPress={onNavigateToAdmin} />
        {botsAvailable && (
          <Button
            text="Załaduj dostępne lokacje"
            onPress={retrieveAvailableLocations}
          />
        )}
      </LoadingWrapper>
    </LayoutProvider>
  );
};
