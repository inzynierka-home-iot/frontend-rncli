import React, { FC } from 'react';
import CheckBox from 'react-native-check-box';
import { theme } from '../../theme';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../Typography';

export type CheckboxProps = {
  variant?: 'default' | 'success' | 'error';
  checked: boolean;
  onPress: () => void;
  label?: string;
};

export const Checkbox: FC<CheckboxProps> = ({
  variant = 'default',
  checked,
  onPress,
  label,
}) => {
  return (
    <View style={styles.container}>
      <CheckBox
        isChecked={checked}
        onClick={onPress}
        checkBoxColor={useCheckboxColor(variant)}
      />
      {label && (
        <Typography text={label} variant='body-medium' />
      )}
    </View>
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
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
});
