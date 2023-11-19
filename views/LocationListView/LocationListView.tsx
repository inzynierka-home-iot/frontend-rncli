import { useEffect, useState } from 'react';
import React from 'react-native';
import { Button, ListItem, Typography } from '../../.storybook/stories';
import { LayoutProvider, NavbarWithLogout } from '../../components';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { useAppNavigation } from '../../hooks';
import {
  ReadStoredValue,
  RemoveStoredValue,
  SaveStoredValue,
  resolveUserID,
  sendIoTMessage,
} from '../../utils';
import { useAppDispatch } from '../../redux/hooks';
import { addAlert } from '../../redux/alertsSlice';
import { Alert } from '../../types';
import { useBotFatherId } from '../AdminView/hooks';
import { mtproto } from '../../utils/mtprotoClient';

type LocationCredential = {
  access_hash: string;
  id: string;
  first_name: string;
};

const getBotsListResponse = 'Choose a bot from the list below:';

export const LocationListView = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [botFatherAccessHash, botFatherId] = useBotFatherId();
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
      setListener(botFatherId);
      sendIoTMessage('/mybots', botFatherAccessHash, botFatherId);
    }
  };

  const setListener = (botFatherId: string) => {
    const onUpdate = async (updateInfo: {
      users: { id: string }[];
      updates: {
        message: { message: string; reply_markup: any };
      }[];
    }) => {
      const users = updateInfo.users.map(({ id }) => id);
      if (users.includes(botFatherId)) {
        const messages = updateInfo.updates.map(
          ({ message }) => message.message,
        );
        if (messages.includes(getBotsListResponse)) {
          const botsNames = updateInfo.updates.flatMap(({ message }) =>
            message.reply_markup.rows.flatMap((row: { buttons: any }) =>
              row.buttons.map(
                (button: { text: string }) => button.text.split('@')[1],
              ),
            ),
          );
          await SaveStoredValue('bots_names', JSON.stringify(botsNames));
          mtproto.updates.off('updates', onUpdate);
          loadLocations();
        }
      }
    };

    mtproto.updates.on('updates', onUpdate);

    return () => mtproto.updates.off('updates', onUpdate);
  };

  const loadLocations = async () => {
    const botsNamesString = await ReadStoredValue('bots_names');
    if (botsNamesString) {
      const botsNames: string[] = JSON.parse(botsNamesString);
      const locations = botsNames.map(name => resolveUserID(name));
      Promise.all(locations).then(credentials => {
        setLocationCredentials(credentials);
      });
      const alert: Alert = {
        variant: 'success',
        text: 'Pobrano lokacje',
      };
      dispatch(addAlert(alert));
    } else {
      const alert: Alert = {
        variant: 'error',
        text: 'Brak zapisanych lokacji',
      };
      dispatch(addAlert(alert));
      setLocationCredentials([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <LayoutProvider navbar={<NavbarWithLogout text="Lista lokalizacji" />}>
      <LoadingWrapper isLoading={isLoading}>
        {locationCredentials?.length ? (
          locationCredentials.map(({ access_hash, id, first_name }) => (
            <ListItem
              text={first_name}
              key={id}
              onPress={() => onNavigateToDeviceList(access_hash, id)}
            />
          ))
        ) : (
          <Typography
            variant="header-medium"
            text="Nie masz żadnych lokalizacji"
          />
        )}
        <Button
          text="Załaduj dostępne lokacje"
          onPress={retrieveAvailableLocations}
        />
        <Button text="Stwórz nową lokalizację" onPress={onNavigateToAdmin} />
      </LoadingWrapper>
    </LayoutProvider>
  );
};
