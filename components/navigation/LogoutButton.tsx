import React from 'react';
import { Button } from 'react-native';
import { logoutFromTelegram } from '../../utils';
import { useAppNavigation } from '../../hooks';

export const LogoutButton = () => {
  const navigation = useAppNavigation();

  const logout = () => {
    logoutFromTelegram(navigation);
  };

  return <Button title="Logout" onPress={logout} />;
};
