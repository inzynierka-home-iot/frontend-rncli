import 'stream-browserify';
import 'react-native-quick-crypto';
import React, { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInForm, TelegramForm } from './components';
import { useEffect, useState } from 'react';
import { connect } from './utils/mtprotoClient';

export type RootStackParamList = {
  SignIn: undefined;
  Telegram: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await connect();
      if (res) {
        setIsConnected(true);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      {isConnected ? (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInForm} />
          <Stack.Screen name="Telegram" component={TelegramForm} />
        </Stack.Navigator>
      ) : (
        <Text>Loading</Text>
      )}
    </NavigationContainer>
  );
}
