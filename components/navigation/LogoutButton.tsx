import React from 'react';
import { Button } from 'react-native';
import { logoutFromTelegram } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../App';

export const LogoutButton = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const logout = () => {
    logoutFromTelegram(navigation);
  };

  return <Button title="Logout" onPress={logout} />;
};
