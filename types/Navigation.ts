import { StackNavigationProp } from '@react-navigation/stack';
import { DeviceType } from '.';

export type DeviceViewRouteParams = {
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
  DeviceTypes: {
    botHash: string;
    botId: string;
  };
  DeviceList: {
    botHash: string;
    botId: string;
    deviceType: DeviceType;
  };
  Light: DeviceViewRouteParams;
  RgbLight: DeviceViewRouteParams;
  Fan: DeviceViewRouteParams;
  DistanceDetector: DeviceViewRouteParams;
  HumidityDetector: DeviceViewRouteParams;
  LightDetector: DeviceViewRouteParams;
  MotionDetector: DeviceViewRouteParams;
  TempSensor: DeviceViewRouteParams;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;
