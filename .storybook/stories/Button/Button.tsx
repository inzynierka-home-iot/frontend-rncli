import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Typography } from '../Typography/Typography';

type ButtonProps = {
  text: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'error' | 'success';
  disabled?: boolean;
  hasFullWidth?: boolean;
};

export const Button: FC<ButtonProps> = ({
  text,
  size = 'large',
  variant = 'default',
  onPress,
  disabled = false,
}) => {
  const styles = useSizes(variant, size, disabled);
  const textColor = disabled ? 'text-secondary' : 'text-invertedPrimary';

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
      }}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}>
      <Typography variant="body-medium" text={text} color={textColor} />
    </TouchableOpacity>
  );
};

const useSizes = (
  variant: ButtonProps['variant'],
  size: ButtonProps['size'],
  disabled: ButtonProps['disabled'],
) => {
  const buttonColor = disabled
    ? 'background-subtle'
    : variant == 'default'
    ? 'text-informative'
    : variant == 'success'
    ? 'text-success'
    : 'text-error';
  const buttonSize = size === 'large' ? 4 : size === 'medium' ? 3 : 2;

  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors[buttonColor],
      paddingHorizontal: theme.spacing(buttonSize * 2),
      paddingVertical: theme.spacing(buttonSize),
      borderRadius: theme.spacing(buttonSize),
    },
  };
};
