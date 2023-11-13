import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';

export type LoadingProps = {
  size?: 'small' | 'large';
};

export const Loading: FC<LoadingProps> = ({ size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={theme.colors['action-primary']}
        style={styles.scale}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scale: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});
