import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export type LoadingProps = {
  size?: 'small' | 'large';
};

export const Loading: FC<LoadingProps> = ({ size = 'large' }) => {
  return (
    <ActivityIndicator style={styles.container} size={size} color={theme.colors['action-primary']} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
  },
});
