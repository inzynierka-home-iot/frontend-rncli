import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme'
import { Typography } from '../Typography/Typography';

type ButtonProps = {
  text: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'error' | 'success';
  disabled?: boolean;
  hasFullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  text,
  size = 'medium',
  variant = 'default',
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...sizeStyles(size === 'large' ? 4 : size === 'medium' ? 3 : 2).size
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Typography
        variant='body-medium'
        text={text}
        color='text-invertedPrimary'
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors['action-active'],
  },
});

const sizeStyles = (num: number) => StyleSheet.create({
  size: {
    paddingHorizontal: theme.spacing(num * 2),
    paddingVertical: theme.spacing(num),
    borderRadius: theme.spacing(num),
  }
})
