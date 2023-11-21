import { FC, useCallback, useEffect, useState } from 'react';
import React from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, ListItem, Typography } from '../../.storybook/stories';
import { LayoutProvider, NavbarWithLogout } from '../../components';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { useAppNavigation } from '../../hooks';
import { resolveUserID, sendIoTMessage } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useBotFatherId, useListenForBotFather } from '../AdminView/hooks';
import { Alert, LocationCredential } from '../../types';
import { addAlert } from '../../redux/alertsSlice';

export const LocationListView: FC = () => {
  const dispatch = useAppDispatch();
  const { botsNames } = useAppSelector(state => state.admin);

  const [botFatherAccessHash, botFatherId] = useBotFatherId();
  useListenForBotFather(botFatherId);

  const [isLoading, setIsLoading] = useState(true);
  const [botsAvailable, setBotsAvailable] = useState(false);
  const [locationCredentials, setLocationCredentials] =
    useState<LocationCredential[]>();
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
      setIsLoading(true);
      setBotsAvailable(false);
      setLocationCredentials(undefined);
      sendIoTMessage('/mybots', botFatherAccessHash, botFatherId);
    }
  };

  useEffect(() => {
    if (botsNames) {
      if (!!botsNames.length) {
        setBotsAvailable(true);
        const locations = botsNames.map(name => resolveUserID(name));
        Promise.all(locations).then(credentials => {
          const alert: Alert = !!credentials.length
            ? {
                variant: 'success',
                text: 'Pobrano lokacje',
              }
            : {
                variant: 'error',
                text: 'Brak zapisanych lokacji',
              };
          dispatch(addAlert(alert));
          setLocationCredentials(credentials);
          setIsLoading(false);
        });
      } else {
        const alert: Alert = {
          variant: 'error',
          text: 'Brak podpiętych botów',
        };
        dispatch(addAlert(alert));
        setIsLoading(false);
      }
    }
  }, [botsNames]);

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
        {botsAvailable && (
          <Button
            text="Załaduj dostępne lokacje"
            onPress={retrieveAvailableLocations}
          />
        )}
        <Button text="Stwórz nową lokalizację" onPress={onNavigateToAdmin} />
      </LoadingWrapper>
    </LayoutProvider>
  );
};
