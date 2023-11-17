import React, { FC, PropsWithChildren } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
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
      <ScrollView
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
};
