import React, { FC } from 'react';
import CheckBox from 'react-native-check-box';
import { theme } from '../../theme';
import { StyleSheet } from 'react-native';

type CheckboxProps = {
  variant?: 'default' | 'success' | 'error';
  checked: boolean;
  onPress: () => void;
};

export const Checkbox: FC<CheckboxProps> = ({
  variant = 'default',
  checked,
  onPress,
}) => {
  return (
    <CheckBox
      isChecked={checked}
      onClick={onPress}
      checkBoxColor={useCheckboxColor(variant)}
      style={{ ...styles.checkbox }}
    />
  );
};

const useCheckboxColor = (variant: CheckboxProps['variant']) => {
  const checkboxColor =
    variant == 'default'
      ? 'text-informative'
      : variant == 'success'
      ? 'text-success'
      : 'text-error';
  return theme.colors[checkboxColor];
};

const styles = StyleSheet.create({
  checkbox: {
    padding: theme.spacing(1),
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
  },
});
