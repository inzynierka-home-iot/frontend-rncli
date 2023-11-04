import { StackNavigationProp } from '@react-navigation/stack';

type DeviceViewRouteParams = {
  location: string;
  nodeId: string;
  deviceId: string;
  botHash: string;
  botId: string;
};

export type RootStackParamList = {
  Login: undefined;
  ConfirmAuth: {
    phoneCodeHash: string;
    diallingCode: string;
    phoneNumber: string;
  };
  Telegram: undefined;
  LocationList: undefined;
  Admin: undefined;
  DeviceList: {
    botHash: string;
    botId: string;
  };
  Light: DeviceViewRouteParams;
  TempSensor: DeviceViewRouteParams;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;
