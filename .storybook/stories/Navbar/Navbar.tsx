import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../Typography/Typography';
import { theme } from '../../theme';
import { Button, ButtonProps } from '../Button/Button';

export type NavbarProps = {
  text: string;
  buttons?: Array<ButtonProps>;
};

export const Navbar: FC<NavbarProps> = ({ text, buttons = [] }) => {
  return (
    <View style={styles.container}>
      <Typography variant={'header-small'} text={text} />
      {buttons.map((button, index) => (
        <Button
          key={`Button${index}`}
          text={button.text}
          variant={button.variant}
          size={button.size}
          onPress={button.onPress}
        />
      ))}
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
});
