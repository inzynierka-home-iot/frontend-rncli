import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';
import { Typography } from '../Typography/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export type AlertBannerProps = {
  text: string;
  isOpen: boolean;
  variant?: 'success' | 'informative' | 'error';
  onClose: () => void;
};

export const AlertBanner: FC<AlertBannerProps> = ({
  text,
  isOpen,
  variant = 'informative',
  onClose,
}) => {
  const styles = useStyles(variant);

  if (!isOpen) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Typography
          variant={'body-medium'}
          text={text}
          color="text-invertedPrimary"
        />
      </View>
      <TouchableOpacity
        style={styles.close}
        activeOpacity={0.2}
        onPress={onClose}>
        <FontAwesomeIcon
          icon={faXmark}
          color={theme.colors['text-invertedPrimary']}
          size={theme.spacing(8)}
        />
      </TouchableOpacity>
    </View>
  );
};

const useStyles = (variant: AlertBannerProps['variant']) => {
  const backgroundColor =
    variant == 'success'
      ? 'text-success'
      : variant == 'informative'
      ? 'text-informative'
      : 'text-error';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors[backgroundColor],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing(6),
      paddingVertical: theme.spacing(2),
      margin: theme.spacing(2),
      borderRadius: theme.spacing(2),
    },
    message: {
      flex: 1,
    },
    close: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
  });
};
