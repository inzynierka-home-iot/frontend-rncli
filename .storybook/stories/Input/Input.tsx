import React, { FC, useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
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
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  checkBoundary?: boolean;
  min?: number;
  max?: number;
};

export const Input: FC<InputProps> = ({
  text,
  keyboardType = 'default',
  placeholder = '',
  variant = 'default',
  disabled = false,
  autoCapitalize = 'sentences',
  centerText = false,
  onChange,
  onBlur,
  checkBoundary = true,
  min = 0,
  max = 100,
}) => {
  const [type, setType] = useState<InputProps['variant'] | 'active'>(variant);

  const onChangeInput = useCallback((value: string) => {
    const newValue =
      keyboardType === 'default'
        ? getStringValue(value)
        : getNumberValue(value);
    onChange(newValue);
  }, []);

  const onFocusInput = useCallback(
    (value: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setType('active');
    },
    [],
  );

  const onBlurInput = useCallback(
    (value: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
      setType(variant);
      onBlur?.(value.nativeEvent.text);
    },
    [variant],
  );

  const getNumberValue = (value: string): string => {
    if (value === '') {
      if (!checkBoundary) {
        return '';
      }
      value = min.toString();
    }
    const parts = value.replace(',', '.').split('.').slice(0, 2);
    parts[0] = parseInt(parts[0]).toString();
    const newValue = parts.join('.');
    const newValueNumeric = parseFloat(newValue);
    if (isNaN(newValueNumeric)) {
      return '';
    }
    if (checkBoundary && newValueNumeric < min) {
      return min.toString();
    } else if (checkBoundary && newValueNumeric > max) {
      return max.toString();
    }
    return newValue;
  };

  const getStringValue = (value: string): string => {
    if (!checkBoundary) {
      return value;
    }
    if (value.length <= max) {
      return value;
    }
    return value.slice(0, max);
  };

  const styles = useStyles(type, disabled, text, centerText);

  return (
    <TextInput
      placeholder={placeholder}
      value={text}
      keyboardType={keyboardType}
      onChangeText={onChangeInput}
      onFocus={onFocusInput}
      onEndEditing={onBlurInput}
      editable={!disabled}
      autoCapitalize={autoCapitalize}
      style={[styles.input, theme.typography['body-medium']]}
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
