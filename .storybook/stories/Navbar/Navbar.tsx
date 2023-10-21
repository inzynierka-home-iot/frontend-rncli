import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from '../Typography/Typography';
import { theme } from '../../theme';
import { Button, ButtonProps } from '../Button/Button';
import { useAppNavigation } from '../../../hooks';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export type NavbarProps = {
  text: string;
  buttons?: Array<ButtonProps>;
  backButton?: boolean;
};

export const Navbar: FC<NavbarProps> = ({
  text,
  buttons = [],
  backButton = true,
}) => {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Typography variant={'header-small'} text={text} />
      <View style={styles.buttons}>
        {buttons.map((button, index) => (
          <Button
            key={`Button${index}`}
            text={button.text}
            variant={button.variant}
            size={button.size}
            onPress={button.onPress}
          />
        ))}
        {backButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={theme.spacing(6)}
              color="#ffffff"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  backButton: {
    backgroundColor: theme.colors['background-neutral'],
    padding: theme.spacing(2),
    borderRadius: theme.spacing(6),
  },
});
