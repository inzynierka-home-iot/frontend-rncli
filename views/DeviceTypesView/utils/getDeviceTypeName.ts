import { DeviceType } from '../../../types';

const TYPE_TO_CATEGORY: Record<DeviceType, string> = {
  S_BINARY: 'Lights',
  S_FAN: 'Fans',
  S_LOCK: 'Locks',
  S_RGB_LIGHT: 'RGB Lights',
  S_TEMP: 'Temp Sensors',
  S_DISTANCE: 'Distance Detectors',
  S_HUM: 'Humidity Detectors',
  S_LIGHT_LEVEL: 'Light Detectors',
  S_MOTION: 'Motion Detectors',
};

export const getDeviceTypeName = (type: DeviceType) => TYPE_TO_CATEGORY[type];
