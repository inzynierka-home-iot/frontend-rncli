import {
  IconDefinition,
  faLightbulb,
  faLock,
  faTemperature2,
} from '@fortawesome/free-solid-svg-icons';
import { DeviceType } from '../types/Device';

const DEVICE_ICONS: Record<DeviceType, IconDefinition> = {
  S_LIGHT: faLightbulb,
  S_TEMP: faTemperature2,
  S_LOCK: faLock,
};

export const getDeviceIcon = (name: DeviceType): IconDefinition => {
  return DEVICE_ICONS[name];
};
