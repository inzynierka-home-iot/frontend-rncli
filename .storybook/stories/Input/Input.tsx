import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { theme } from '../../theme';

export type InputProps = {
  text: string;
  keyboardType?: 'default' | 'numeric';
  placeholder?: string;
  variant?: 'default' | 'error';
  disabled?: boolean;
  centerText?: boolean;
  onChange: (e: string) => void;
};

export const Input: FC<InputProps> = ({
  text,
  keyboardType = 'default',
  placeholder = 'Placeholder',
  variant = 'default',
  disabled = false,
  centerText = false,
  onChange,
}) => {
  const [type, setType] = useState<InputProps['variant'] | 'active'>(variant);
  const onFocus = useCallback(() => setType('active'), []);
  const onBlur = useCallback(() => setType(variant), [variant]);
  const styles = useStyles(type, disabled, text, centerText);

  return (
    <TextInput
      placeholder={placeholder}
      value={text}
      keyboardType={keyboardType}
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
  centerText: InputProps['centerText'],
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
  const elevation = !disabled ? 2 : 1;
  const textAlign = centerText ? 'center' : 'left';

  return StyleSheet.create({
    input: {
      color: theme.colors[textColor],
      borderColor: theme.colors[borderColor],
      width: '100%',
      ...theme.typography['body-medium'],
      borderWidth: 1,
      elevation,
      borderRadius: theme.spacing(1),
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(2),
      backgroundColor: theme.colors['background-primary'],
      textAlign,
    },
  });
};
