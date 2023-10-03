import React, { FC, useState } from 'react';
import CheckBox from 'react-native-check-box';
import { theme } from '../../theme';

type CheckboxProps = {
  variant?: 'default' | 'success' | 'error';
  checked?: boolean;
  onPress: () => void;
  paddingSize: number;
};

export const Checkbox: FC<CheckboxProps> = ({
  variant = 'default',
  checked = true,
  onPress,
  paddingSize = 4,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const checkboxColor =
    variant == 'default'
      ? 'text-informative'
      : variant == 'success'
      ? 'text-success'
      : 'text-error';

  return (
    <CheckBox
      isChecked={isChecked}
      onClick={() => {
        onPress;
        setIsChecked(!isChecked);
      }}
      checkBoxColor={theme.colors[checkboxColor]}
      style={{ padding: theme.spacing(paddingSize) }}
    />
  );
};
