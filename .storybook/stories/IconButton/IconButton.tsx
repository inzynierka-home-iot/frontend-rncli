import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type IconButtonProps = {
  icon: IconDefinition;
  onPress: (...args: any) => any;
  variant?: 'default' | 'error' | 'success';
  disabled?: boolean;
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = 'default',
  disabled = false,
}) => {
  const styles = useStyles(variant, disabled);

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <FontAwesomeIcon icon={icon} size={theme.spacing(5)} color="#ffffff" />
    </TouchableOpacity>
  );
};

const useStyles = (
  variant: IconButtonProps['variant'],
  disabled: IconButtonProps['disabled'],
) => {
  const buttonColor = disabled
    ? 'background-subtle'
    : variant == 'default'
      ? 'background-neutral'
      : variant == 'success'
        ? 'text-success'
        : 'text-error';

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors[buttonColor],
      padding: theme.spacing(1),
      borderRadius: theme.spacing(6),
    },
  });
};
