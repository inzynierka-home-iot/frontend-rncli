import 'stream-browserify';
import 'react-native-quick-crypto';
import React, { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TelegramForm } from './components';
import {
  ConfirmAuthView,
  DeviceListView,
  AdminView,
  DistanceDetectorView,
  FanView,
  HumidityDetectorView,
  LightDetectorView,
  LightView,
  LocationListView,
  LoginView,
  MotionDetectorView,
  RgbLightView,
  TempSensorView,
} from './views';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './redux/store';
import { useTelegramConnection } from './hooks';
import { RootStackParamList } from './types';
import { LoadingWrapper } from './components/LoadingWrapper';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { isConnected, isError } = useTelegramConnection();

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <LoadingWrapper isLoading={!isConnected}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="ConfirmAuth" component={ConfirmAuthView} />
            <Stack.Screen name="LocationList" component={LocationListView} />
            <Stack.Screen name="Admin" component={AdminView} />
            <Stack.Screen name="DeviceList" component={DeviceListView} />
            <Stack.Screen name="Light" component={LightView} />
            <Stack.Screen name="RgbLight" component={RgbLightView} />
            <Stack.Screen name="TempSensor" component={TempSensorView} />
            <Stack.Screen name="Fan" component={FanView} />
            <Stack.Screen
              name="DistanceDetector"
              component={DistanceDetectorView}
            />
            <Stack.Screen
              name="HumidityDetector"
              component={HumidityDetectorView}
            />
            <Stack.Screen name="LightDetector" component={LightDetectorView} />
            <Stack.Screen
              name="MotionDetector"
              component={MotionDetectorView}
            />
            <Stack.Screen name="Telegram" component={TelegramForm} />
          </Stack.Navigator>
        </LoadingWrapper>
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
}

// export { default } from './.storybook';
