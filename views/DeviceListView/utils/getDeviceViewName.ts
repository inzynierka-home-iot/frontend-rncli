import { DeviceType } from '../../../types';

const DEVICE_TO_VIEW: Record<DeviceType, string> = {
  S_BINARY: 'Light',
  S_FAN: 'Fan',
  S_LOCK: 'Lock',
  S_RGB_LIGHT: 'RgbLight',
  S_TEMP: 'TempSensor',
  S_DISTANCE: 'DistanceDetector',
  S_HUM: 'HumidityDetector',
  S_LIGHT_LEVEL: 'LightDetector',
  S_MOTION: 'MotionDetector',
};

export const getDeviceViewName = (type: DeviceType) => DEVICE_TO_VIEW[type];
