import React, { FC, PropsWithChildren } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { Alerts } from '../Alerts';
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
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>{children}</View>
      </ScrollView>
      <Alerts />
    </View>
  );
};
