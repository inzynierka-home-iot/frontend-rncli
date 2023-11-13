import { Animated, Easing, EasingFunction } from 'react-native';

type EasingFuncions = {
  type: 'ease' | 'linear';
};

const EASING_FUNCIONS: Record<EasingFuncions['type'], EasingFunction> = {
  ease: Easing.ease,
  linear: Easing.linear,
};

export const getEasingFunc = (type: EasingFuncions['type']): EasingFunction => {
  return EASING_FUNCIONS[type];
};

export const animation = (
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
