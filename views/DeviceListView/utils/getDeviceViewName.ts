import { DeviceType } from '../../../types';

const DEVICE_TO_VIEW: Record<DeviceType, string> = {
  S_BINARY: 'Light',
  S_LOCK: 'Lock',
  S_TEMP: 'TemperatureSensor',
};

export const getDeviceViewName = (type: DeviceType) => DEVICE_TO_VIEW[type];
