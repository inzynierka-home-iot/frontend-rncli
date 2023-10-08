import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { theme } from '../../theme';

type InputProps = {
  text: string;
  variant?: 'default' | 'error';
  disabled?: boolean;
  onChange: (e: string) => void;
};

export const Input: FC<InputProps> = ({
  text,
  variant = 'default',
  disabled = false,
  onChange,
}) => {
  const [type, setType] = useState<InputProps['variant'] | 'active'>(variant);
  const onFocus = useCallback(() => setType('active'), []);
  const onBlur = useCallback(() => setType(variant), [variant]);
  const styles = useStyles(type, disabled, text);

  return (
    <TextInput
      placeholder="Input placeholder"
      value={text}
      onChangeText={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      editable={!disabled}
      style={styles.input}
    />
  );
};

const useStyles = (
  type: InputProps['variant'] | 'active',
  disabled: InputProps['disabled'],
  text: InputProps['text'],
) => {
  const borderColor =
    type == 'default'
      ? 'background-subtle'
      : type == 'active'
      ? 'action-selected'
      : type == 'error'
      ? 'text-error'
      : 'background-subtle';
  const textColor = disabled
    ? 'text-secondary'
    : text != ''
    ? 'text-primary'
    : 'text-secondary';

  return StyleSheet.create({
    input: {
      color: theme.colors[textColor],
      borderColor: theme.colors[borderColor],
      flex: 1,
      margin: theme.spacing(2),
      ...theme.typography['body-medium'],
      borderWidth: 1,
      elevation: 2,
      borderRadius: theme.spacing(1),
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(2),
      backgroundColor: theme.colors['background-primary'],
    },
  });
};
