import React, { FC, useCallback } from 'react';
import { ButtonProps, Navbar } from '../../.storybook/stories';
import { useAppNavigation } from '../../hooks';
import { logoutFromTelegram } from '../../utils';

type Props = {
  text: string;
  backButton?: boolean;
};

export const NavbarWithLogout: FC<Props> = ({ text, backButton = false }) => {
  const navigation = useAppNavigation();

  const handleLogout = useCallback(() => {
    logoutFromTelegram(navigation);
  }, [navigation]);

  const logoutButtonProps: ButtonProps = {
    text: 'Wyloguj',
    variant: 'error',
    size: 'small',
    onPress: handleLogout,
  };

  return (
    <Navbar text={text} button={logoutButtonProps} backButton={backButton} />
  );
};
