import React, { FC, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  EasingFunction,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';
import { Typography } from '../Typography/Typography';
import { AlertBannerConsts } from './env/AlertBannerConsts';

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
  const opacity = useRef(new Animated.Value(AlertBannerConsts.FROM)).current;

  const animation = (
    animatedValue: Animated.Value,
    easing: EasingFunction,
    from: number,
    to: number,
    duration: number,
  ) => {
    animatedValue.setValue(from);
    return Animated.timing(animatedValue, {
      toValue: to,
      duration,
      easing,
      useNativeDriver: true,
    });
  };

  const close = () => {
    animation(
      opacity,
      Easing.ease,
      AlertBannerConsts.TO,
      AlertBannerConsts.FROM,
      AlertBannerConsts.CLOSE_DURATION,
    ).start(onClose);
  };

  useEffect(() => {
    const animationID = animation(
      opacity,
      Easing.ease,
      AlertBannerConsts.FROM,
      AlertBannerConsts.TO,
      AlertBannerConsts.START_DURATION,
    );

    animationID.start();
    const timeout = setTimeout(close, AlertBannerConsts.CLOSE_ALERT);

    return () => {
      animationID.stop();
      clearTimeout(timeout);
    };
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
