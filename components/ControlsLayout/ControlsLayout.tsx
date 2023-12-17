import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { styles } from './ControlsLayout.styles';

export const ControlsLayout: FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};
