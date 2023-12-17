import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../Typography/Typography';
import { TypographyKeys, theme } from '../../theme';
import { Button, ButtonProps } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { useAppNavigation } from '../../../hooks';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export type NavbarProps = {
  text: string;
  button?: ButtonProps;
  backButton?: boolean;
  variant?: TypographyKeys;
};

export const Navbar: FC<NavbarProps> = ({
  text,
  button = null,
  backButton = true,
  variant = 'header-medium',
}) => {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        {backButton && (
          <IconButton icon={faChevronLeft} onPress={navigation.goBack} />
        )}
        <Typography variant={variant} text={text} numberOfLines={1} />
      </View>
      {button && <Button {...button} />}
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
    zIndex: 1,
  },
  leftSide: {
    flexDirection: 'row',
    gap: theme.spacing(4),
  },
});
