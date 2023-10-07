import React, { FC, useState } from 'react';
import { TextInput } from 'react-native';
import { theme } from '../../theme';

type TextInputProps = {
  text: string;
  variant?: 'default' | 'active' | 'error' | 'disabled';
  onPress: () => void;
};

export const Input: FC<TextInputProps> = ({
  text = 'Input value',
  variant = 'default',
  onPress,
}) => {
  const [value, setValue] = useState(text);
  const [type, setType] = useState(variant);
  const borderColor =
    type == 'default'
      ? 'background-subtle'
      : type == 'active'
      ? 'action-selected'
      : type == 'error'
      ? 'text-error'
      : 'background-subtle';
  const textColor =
    variant == 'disabled'
      ? 'text-secondary'
      : value != ''
      ? 'text-primary'
      : 'text-secondary';
  const editable = variant != 'disabled';

  return (
    <TextInput
      placeholder="Input placeholder"
      value={value}
      onChangeText={e => {
        setValue(e);
        onPress;
      }}
      onFocus={() => setType('active')}
      onBlur={() => setType(variant)}
      editable={editable}
      style={{
        ...theme.typography['body-medium'],
        color: theme.colors[textColor],
        borderWidth: 1,
        elevation: 2,
        borderRadius: theme.spacing(1),
        borderColor: theme.colors[borderColor],
        paddingHorizontal: theme.spacing(4),
        paddingVertical: theme.spacing(2),
        backgroundColor: theme.colors['background-primary'],
      }}
    />
  );
};
