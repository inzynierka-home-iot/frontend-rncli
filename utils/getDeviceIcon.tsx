import {
  IconDefinition,
  faBell,
  faDroplet,
  faFan,
  faLightbulb,
  faLock,
  faPeopleArrows,
  faPersonWalking,
  faSun,
  faTemperature2,
  faCloud,
} from '@fortawesome/free-solid-svg-icons';
import { DeviceType } from '../types/Device';

const DEVICE_ICONS: Record<DeviceType, IconDefinition> = {
  S_BINARY: faLightbulb,
  S_CUSTOM: faBell,
  S_DISTANCE: faPeopleArrows,
  S_FAN: faFan,
  S_HUM: faCloud,
  S_LOCK: faLock,
  S_LIGHT_LEVEL: faSun,
  S_MOTION: faPersonWalking,
  S_RGB_LIGHT: faLightbulb,
  S_TEMP: faTemperature2,
  S_SPRINKLER: faDroplet,
};

export const getDeviceIcon = (name: DeviceType): IconDefinition => {
  return DEVICE_ICONS[name];
};
