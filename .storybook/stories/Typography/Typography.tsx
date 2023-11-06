import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ColorKeys, theme, TypographyKeys } from '../../theme';

export type TypographyProps = {
  variant: TypographyKeys;
  text: string;
  color?: ColorKeys;
  selectable?: boolean;
};

export const Typography: FC<TypographyProps> = ({
  variant,
  text,
  color = 'text-primary',
  selectable = false,
}) => {
  const styles = StyleSheet.create({
    ...theme.typography[variant],
    color: theme.colors[color],
  });

  return <Text style={styles} selectable={selectable}>{text}</Text>;
};
