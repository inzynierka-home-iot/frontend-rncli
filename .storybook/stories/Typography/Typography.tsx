import React, { FC } from 'react';
import { Text } from 'react-native';
import { ColorKeys, theme, TypographyKeys } from '../../theme';

type TypographyProps = {
  variant: TypographyKeys;
  text: string;
  color?: ColorKeys;
};

export const Typography: FC<TypographyProps> = ({
  variant,
  text,
  color = 'text-primary',
}) => {
  const styles = {
    ...theme.typography[variant],
    color: theme.colors[color],
  };

  return <Text style={styles}>{text}</Text>;
};
