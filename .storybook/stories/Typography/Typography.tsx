import React, { FC } from 'react';
import { Text } from 'react-native';
import { ColorKeys, theme, TypographyKeys } from '../../theme';

export type TypographyProps = {
  variant: TypographyKeys;
  text: string;
  color?: ColorKeys;
  selectable?: boolean;
  center?: boolean;
};

export const Typography: FC<TypographyProps> = ({
  variant,
  text,
  color = 'text-primary',
  selectable = false,
  center = false,
}) => {
  return (
    <Text
      style={[
        center && { textAlign: 'center' },
        { color: theme.colors[color] },
        theme.typography[variant],
      ]}
      selectable={selectable}>
      {text}
    </Text>
  );
};
