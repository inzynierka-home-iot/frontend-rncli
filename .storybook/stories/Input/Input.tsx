import React, { FC, useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputEndEditingEventData,
} from 'react-native';
import { theme } from '../../theme';

export type InputProps = {
  text: string;
  keyboardType?: 'default' | 'numeric';
  placeholder?: string;
  variant?: 'default' | 'error';
  disabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  centerText?: boolean;
  onChange: (e: string) => void;
  onBlur?: (e: string) => void;
  onFocus?: () => void;
};

export const Input: FC<InputProps> = ({
  text,
  keyboardType = 'default',
  placeholder = 'Placeholder',
  variant = 'default',
  disabled = false,
  autoCapitalize = 'sentences',
  centerText = false,
  onChange,
  onBlur,
  onFocus,
}) => {
  const [type, setType] = useState<InputProps['variant'] | 'active'>(variant);
  const onFocusInput = useCallback(() => setType('active'), []);
  const onBlurInput = useCallback(
    (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
      setType(variant);
      onBlur?.(e.nativeEvent.text);
    },
    [variant],
  );
  const styles = useStyles(type, disabled, text, centerText);

  return (
    <TextInput
      placeholder={placeholder}
      value={text}
      keyboardType={keyboardType}
      onChangeText={onChange}
      onFocus={onFocusInput}
      onEndEditing={onBlurInput}
      editable={!disabled}
      autoCapitalize={autoCapitalize}
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
