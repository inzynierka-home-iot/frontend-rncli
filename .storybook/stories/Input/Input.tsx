import React, { FC, useState } from 'react';
import { TextInput } from 'react-native';
import { theme } from '../../theme';

type InputProps = {
  text: string;
  variant?: 'default' | 'error';
  editable?: boolean;
  onChange: (e: string) => void;
};

export const Input: FC<InputProps> = ({
  text,
  variant = 'default',
  editable = true,
  onChange,
}) => {
  const [type, setType] = useState<InputProps['variant'] | 'active'>(variant);
  const borderColor =
    type == 'default'
      ? 'background-subtle'
      : type == 'active'
      ? 'action-selected'
      : type == 'error'
      ? 'text-error'
      : 'background-subtle';
  const textColor = !editable
    ? 'text-secondary'
    : text != ''
    ? 'text-primary'
    : 'text-secondary';

  return (
    <TextInput
      placeholder="Input placeholder"
      value={text}
      onChangeText={onChange}
      onFocus={() => setType('active')}
      onBlur={() => setType(variant)}
      editable={editable}
      style={{
        flex: 1,
        margin: theme.spacing(2),
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
