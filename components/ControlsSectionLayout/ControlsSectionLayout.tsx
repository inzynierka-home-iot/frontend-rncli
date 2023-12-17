import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { styles } from './ControlsSectionLayout.styles';

export const ControlsSectionLayout: FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.content}>{children}</View>;
};
