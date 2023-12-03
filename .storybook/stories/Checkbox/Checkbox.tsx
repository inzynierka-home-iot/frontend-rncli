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
};

export const CheckBox: FC<CheckBoxProps> = ({
  variant = 'default',
  checked,
  onPress,
  label,
}) => {
  const color = useCheckBoxColor(variant);

  return (
    <View style={styles.container}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={onPress}
        color={color}
        uncheckedColor={color}
      />
      {label && <Typography text={label} variant="body-medium" />}
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
    gap: theme.spacing(2),
  },
});
