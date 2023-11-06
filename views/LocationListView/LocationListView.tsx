import { useEffect, useState } from 'react';
import React, { View } from 'react-native';
import { Button, ListItem, Typography } from '../../.storybook/stories';
import { NavbarWithLogout } from '../../components';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { useAppNavigation } from '../../hooks';
import { resolveUserID } from '../../utils';
import { BOT_NAMES } from '../../utils/env';
import { styles } from './LocationListView.styles';

type LocationCredential = {
  access_hash: string;
  id: string;
  first_name: string;
};

export const LocationListView = () => {
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

  useEffect(() => {
    const locations = BOT_NAMES.map(name => resolveUserID(name));
    Promise.all(locations).then(credentials =>
      setLocationCredentials(credentials),
    );
  }, []);

  return (
    <View style={styles.container}>
      <NavbarWithLogout text="Lista lokalizacji" />
      <View style={styles.content}>
        <LoadingWrapper isLoading={!locationCredentials}>
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
              text="Nie masz zadnych lokalizacji"
            />
          )}
        </LoadingWrapper>
        <Button text="Stwórz nową lokalizację" onPress={onNavigateToAdmin} />
      </View>
    </View>
  );
};
