import React, { FC } from 'react';
import { theme } from '../../theme';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../Typography';
import { Checkbox } from 'react-native-paper';

export type CheckBoxProps = {
  variant?: 'default' | 'success' | 'error';
  checked: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
};

export const CheckBox: FC<CheckBoxProps> = ({
  variant = 'default',
  checked,
  onPress,
  label,
  disabled = false,
}) => {
  const color = useCheckBoxColor(variant);

  return (
    <View style={styles.container}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onPress}
        color={color}
        uncheckedColor={color}
        disabled={disabled}
      />
      {label && (
        <Typography
          text={label}
          variant="body-medium"
          color={disabled ? 'text-secondary' : 'text-primary'}
        />
      )}
    </View>
  );
};

const useCheckBoxColor = (variant: CheckBoxProps['variant']) => {
  const checkBoxColor =
    variant == 'default'
      ? 'text-informative'
      : variant == 'success'
      ? 'text-success'
      : 'text-error';
  return theme.colors[checkBoxColor];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
});
