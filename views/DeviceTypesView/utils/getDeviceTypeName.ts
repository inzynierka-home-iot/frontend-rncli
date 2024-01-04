import { DeviceType } from '../../../types';

const TYPE_TO_CATEGORY: Record<DeviceType, string> = {
  S_BINARY: 'Światełka',
  S_CUSTOM: 'Alarmy',
  S_DISTANCE: 'Czujniki odległości',
  S_FAN: 'Wentylatory',
  S_HUM: 'Czujniki wilgotności',
  S_LIGHT_LEVEL: 'Czujniki światła',
  S_LOCK: 'Zamki',
  S_MOTION: 'Czujniki ruchu',
  S_RGB_LIGHT: 'Światełka RGB',
  S_TEMP: 'Czujniki temperatury',
  S_SPRINKLER: 'Zraszacze',
};

export const getDeviceTypeName = (type: DeviceType) =>
  TYPE_TO_CATEGORY[type] || '';
