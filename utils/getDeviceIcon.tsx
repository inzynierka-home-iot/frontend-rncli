import {
  IconDefinition,
  faLightbulb,
  faLock,
  faTemperature2,
} from '@fortawesome/free-solid-svg-icons';

const DEVICE_ICONS: Record<string, IconDefinition> = {
  S_LIGHT: faLightbulb,
  S_TEMP: faTemperature2,
  S_LOCK: faLock,
};

export const getDeviceIcon = (name: string): IconDefinition => {
  return DEVICE_ICONS[name];
};
