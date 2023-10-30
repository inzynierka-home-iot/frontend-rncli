import 'stream-browserify';
import 'react-native-quick-crypto';
import React, { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TelegramForm } from './components';
import { ConfirmAuthView, DeviceListView, LightView, LoginView } from './views';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './redux/store';
import { useTelegramConnection } from './hooks';
import { RootStackParamList } from './types';
import { TempSensorView } from './views/TempSensorView';
import { Loading } from './.storybook/stories/Loading';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { isConnected, isError } = useTelegramConnection();

  if (isError) {
    return <Text>Error</Text>;
  }

  if (!isConnected) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="ConfirmAuth" component={ConfirmAuthView} />
          <Stack.Screen name="DeviceList" component={DeviceListView} />
          <Stack.Screen name="Light" component={LightView} />
          <Stack.Screen name="TempSensor" component={TempSensorView} />
          <Stack.Screen name="Telegram" component={TelegramForm} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
}

// export { default } from './.storybook';
