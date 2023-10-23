import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../Typography/Typography';
import { theme } from '../../theme';
import { Button, ButtonProps } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { useAppNavigation } from '../../../hooks';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export type NavbarProps = {
  text: string;
  button?: ButtonProps;
  backButton?: boolean;
};

export const Navbar: FC<NavbarProps> = ({
  text,
  button = null,
  backButton = true,
}) => {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Typography variant={'header-small'} text={text} />
      {(button || backButton) && (
        <View style={styles.buttons}>
          {button && <Button {...button} />}
          {backButton && (
            <IconButton
              icon={faChevronLeft}
              onPress={() => {
                navigation.goBack();
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: theme.spacing(19),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing(4),
    paddingHorizontal: theme.spacing(7),
    flexDirection: 'row',
    backgroundColor: theme.colors['text-invertedPrimary'],
    elevation: 2,
  },
  buttons: {
    flexDirection: 'row',
    gap: theme.spacing(4),
  },
});
