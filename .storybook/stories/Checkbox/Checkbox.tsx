import React, { FC } from 'react';
import CheckBox from 'react-native-check-box';
import { theme } from '../../theme';

type CheckboxProps = {
  variant?: 'default' | 'success' | 'error';
  checked: boolean;
  onPress: () => void;
  paddingSize?: number;
};

export const Checkbox: FC<CheckboxProps> = ({
  variant = 'default',
  checked,
  onPress,
  paddingSize = 1,
}) => {
  const checkboxColor =
    variant == 'default'
      ? 'text-informative'
      : variant == 'success'
      ? 'text-success'
      : 'text-error';

  return (
    <CheckBox
      isChecked={checked}
      onClick={onPress}
      checkBoxColor={theme.colors[checkboxColor]}
      style={{
        padding: theme.spacing(paddingSize),
        transform: [{ scaleX: 2 }, { scaleY: 2 }],
      }}
    />
  );
};
