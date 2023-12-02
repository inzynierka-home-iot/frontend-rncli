import { useCallback } from 'react';
import React from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, ListItem, Typography } from '../../.storybook/stories';
import { LayoutProvider, NavbarWithLogout } from '../../components';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { useAppNavigation, useSendTelegramMessage } from '../../hooks';
import { useBotFatherId, useListenForBotFather } from '../AdminView/hooks';
import { useLocationNames } from './hooks';

export const LocationListView = () => {
  const [botFatherAccessHash, botFatherId] = useBotFatherId();
  useListenForBotFather(botFatherId);
  const { isLoading, locationCredentials, showRefresh, startRetrieving } =
    useLocationNames();
  const sendTelegramMessage = useSendTelegramMessage();
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

  const retrieveAvailableLocations = useCallback(() => {
    if (botFatherAccessHash && botFatherId) {
      startRetrieving();
      sendTelegramMessage('/mybots', botFatherAccessHash, botFatherId);
    }
  }, [botFatherAccessHash, botFatherId, sendTelegramMessage, startRetrieving]);

  useFocusEffect(
    useCallback(() => {
      retrieveAvailableLocations();
    }, [botFatherAccessHash, botFatherId]),
  );

  return (
    <LayoutProvider navbar={<NavbarWithLogout text="Lista lokalizacji" />}>
      <LoadingWrapper isLoading={isLoading}>
        {locationCredentials.length ? (
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
        {showRefresh && (
          <Button
            text="Załaduj dostępne lokacje"
            onPress={retrieveAvailableLocations}
          />
        )}
      </LoadingWrapper>
    </LayoutProvider>
  );
};
