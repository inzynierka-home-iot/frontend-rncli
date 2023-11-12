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
  return (
    <Text
      style={[{ color: theme.colors[color] }, theme.typography[variant]]}
      selectable={selectable}>
      {text}
    </Text>
  );
};
