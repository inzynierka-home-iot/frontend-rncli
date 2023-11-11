import React, { FC, PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './LayoutProvider.styles';

type LayoutProviderProps = PropsWithChildren<{
  navbar?: JSX.Element;
}>;

export const LayoutProvider: FC<LayoutProviderProps> = ({
  navbar,
  children,
}) => {
  return (
    <View style={styles.container}>
      {navbar}
      <ScrollView>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
};
