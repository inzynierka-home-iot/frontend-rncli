import React, { FC, useEffect } from 'react';
import {
  Animated,
  Easing,
  EasingFunction,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
  let opacity = new Animated.Value(0);

  const animation = (easing: EasingFunction, from: number, to: number) => {
    opacity.setValue(from);
    return Animated.timing(opacity, {
      toValue: to,
      duration: 600,
      easing,
      useNativeDriver: true,
    });
  };

  const close = () => {
    animation(Easing.ease, 1, 0).start(onClose);
  };

  useEffect(() => {
    animation(Easing.ease, 0, 1).start(() => setTimeout(onClose, 10000));
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity }]}>
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
        onPress={close}>
        <FontAwesomeIcon
          icon={faXmark}
          color={theme.colors['text-invertedPrimary']}
          size={theme.spacing(8)}
        />
      </TouchableOpacity>
    </Animated.View>
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
      backgroundColor: theme.colors[backgroundColor],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing(6),
      paddingVertical: theme.spacing(2),
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
