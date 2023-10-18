import 'stream-browserify';
import 'react-native-quick-crypto';
import React, { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignInForm, TelegramForm } from './components';
import { useEffect, useState } from 'react';
import { connect } from './utils';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './redux/store';

export type RootStackParamList = {
  SignIn: undefined;
  Telegram: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await connect();
      if (res) {
        setIsConnected(true);
      } else {
        setIsError(true);
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isConnected ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="SignIn"
              component={SignInForm}
              options={{ title: 'Sign in', headerBackVisible: false }}
            />
            <Stack.Screen
              name="Telegram"
              component={TelegramForm}
              options={{
                title: 'Dashboard',
                headerBackVisible: false,
              }}
            />
          </Stack.Navigator>
        ) : isError ? (
          <Text>Error</Text>
        ) : (
          <Text>Loading</Text>
        )}
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
}

// export { default } from './.storybook';
