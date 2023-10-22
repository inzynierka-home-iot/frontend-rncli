import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type IconButtonProps = {
  icon: IconDefinition;
  onPress: (...args: any) => any;
  disabled?: boolean;
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.5}>
      <FontAwesomeIcon icon={icon} size={theme.spacing(6)} color="#ffffff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors['background-neutral'],
    padding: theme.spacing(2),
    borderRadius: theme.spacing(6),
  },
});
