import {
  IconDefinition,
  faDroplet,
  faFan,
  faLightbulb,
  faLock,
  faPeopleArrows,
  faPersonWalking,
  faSun,
  faTemperature2,
} from '@fortawesome/free-solid-svg-icons';
import { DeviceType } from '../types/Device';

const DEVICE_ICONS: Record<DeviceType, IconDefinition> = {
  S_BINARY: faLightbulb,
  S_TEMP: faTemperature2,
  S_LOCK: faLock,
  S_RGB_LIGHT: faLightbulb,
  S_FAN: faFan,
  S_MOTION: faPersonWalking,
  S_DISTANCE: faPeopleArrows,
  S_HUM: faDroplet,
  S_LIGHT_LEVEL: faSun,
};

export const getDeviceIcon = (name: DeviceType): IconDefinition => {
  return DEVICE_ICONS[name];
};
