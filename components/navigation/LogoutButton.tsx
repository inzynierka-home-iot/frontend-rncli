import React from 'react';
import { Button } from 'react-native';
import { logoutFromTelegram } from '../../utils';
import { useAppNavigation } from '../../hooks';
import { useAppDispatch } from '../../redux/hooks';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const logout = () => {
    logoutFromTelegram(navigation, dispatch);
  };

  return <Button title="Logout" onPress={logout} />;
};
