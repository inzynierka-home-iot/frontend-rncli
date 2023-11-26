import React, { FC, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AlertBannerConsts } from './AlertBannerConsts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';
import { Typography } from '../Typography/Typography';

export type AlertBannerProps = {
  text: string;
  variant?: 'success' | 'informative' | 'error';
  onClose: () => void;
};

export const AlertBanner: FC<AlertBannerProps> = ({
  text,
  variant = 'informative',
  onClose,
}) => {
  const styles = useStyles(variant);
  const opacity = useRef(new Animated.Value(AlertBannerConsts.FROM)).current;
  const timer = useRef<NodeJS.Timeout | null>(null);
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  const close = () => {
    if (animation.current) {
      return;
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    animation.current = Animated.timing(opacity, {
      toValue: AlertBannerConsts.FROM,
      duration: AlertBannerConsts.CLOSE_DURATION,
      easing: Easing.ease,
      useNativeDriver: true,
    });
    animation.current.start(onClose);
  };

  useEffect(() => {
    animation.current = Animated.timing(opacity, {
      toValue: AlertBannerConsts.TO,
      duration: AlertBannerConsts.START_DURATION,
      easing: Easing.ease,
      useNativeDriver: true,
    });

    animation.current.start(() => {
      animation.current = null;
      timer.current = setTimeout(close, AlertBannerConsts.CLOSE_ALERT);
    });

    return () => {
      if (animation.current) {
        animation.current.stop();
      }
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.message}>
        <Typography
          variant="body-small"
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
