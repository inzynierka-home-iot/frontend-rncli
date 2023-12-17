import {
  DeviceType,
  DeviceViewRouteParams,
  RootStackParamList,
} from '../../../types';

type KeysWithDeviceViewRouteParams<T> = {
  [K in keyof T]: T[K] extends DeviceViewRouteParams ? K : never;
}[keyof T];

type DeviceViewKeys = KeysWithDeviceViewRouteParams<RootStackParamList>;

const DEVICE_TO_VIEW: Record<DeviceType, DeviceViewKeys> = {
  S_BINARY: 'Light',
  S_CUSTOM: 'Buzzer',
  S_DISTANCE: 'DistanceDetector',
  S_FAN: 'Fan',
  S_HUM: 'HumidityDetector',
  S_LIGHT_LEVEL: 'LightDetector',
  S_LOCK: 'Lock',
  S_MOTION: 'MotionDetector',
  S_RGB_LIGHT: 'RgbLight',
  S_TEMP: 'TempSensor',
  S_SPRINKLER: 'Sprinkler',
};

export const getDeviceViewName = (type: DeviceType) => {
  return DEVICE_TO_VIEW[type];
};
