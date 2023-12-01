export enum DeviceType {
  S_BINARY = 'S_BINARY',
  S_CUSTOM = 'S_CUSTOM',
  S_DISTANCE = 'S_DISTANCE',
  S_FAN = 'S_FAN',
  S_HUM = 'S_HUM',
  S_LIGHT_LEVEL = 'S_LIGHT_LEVEL',
  S_LOCK = 'S_LOCK',
  S_MOTION = 'S_MOTION',
  S_RGB_LIGHT = 'S_RGB_LIGHT',
  S_TEMP = 'S_TEMP',
}

export type Device<T = any, K = any, L = any> = {
  location: string;
  id: string;
  nodeId: string;
  type: K;
  name: string;
  values: T;
  schedule?: L;
};

type LightValues = {
  V_STATUS: string;
  V_WATT?: string;
};

export type Light = Device<LightValues, DeviceType.S_BINARY>;

type RgbLightValues = {
  V_RGB: string;
};

export type RgbLight = Device<RgbLightValues, DeviceType.S_RGB_LIGHT>;

type TempSensorValues = {
  V_TEMP: number;
  V_ID?: string;
};

export type TempSensorSchedule = {
  action: string;
  hours: string;
  minutes: string;
  days: string;
};

export type TempSensor = Device<
  TempSensorValues,
  DeviceType.S_TEMP,
  TempSensorSchedule
>;

export type FanValues = {
  V_TEMP: string;
  V_PERCENTAGE: string;
  V_DIRECTION: string;
};

export type FanSchedule = {
  action: string;
  location: string;
  nodeId: string;
  id: string;
  V_TEMP: string;
};

export type Fan = Device<FanValues, DeviceType.S_FAN, FanSchedule>;

type MotionDetectorValues = {
  V_TRIPPED: string;
};

export type MotionDetector = Device<MotionDetectorValues, DeviceType.S_MOTION>;

type DistanceDetectorValues = {
  V_DISTANCE: string;
};

export type DistanceDetector = Device<
  DistanceDetectorValues,
  DeviceType.S_DISTANCE
>;

type HumidityDetectorValues = {
  V_HUM: number;
};

export type HumidityDetector = Device<HumidityDetectorValues, DeviceType.S_HUM>;

type LightDetectorValues = {
  V_LIGHT_LEVEL: number;
};

export type LightDetector = Device<
  LightDetectorValues,
  DeviceType.S_LIGHT_LEVEL
>;

type ButtonValues = {
  V_LOCK_STATUS: string;
};

export type Button = Device<ButtonValues, DeviceType.S_LOCK>;

type BuzzerValues = {
  V_STATUS: string;
};

export type Buzzer = Device<BuzzerValues, DeviceType.S_CUSTOM>;

type LockValues = {
  V_LOCK_STATUS: string;
};

export type Lock = Device<LockValues, DeviceType.S_LOCK>;
