export enum DeviceType {
  S_BINARY = 'S_BINARY',
  S_LOCK = 'S_LOCK',
  S_RGB_LIGHT = 'S_RGB_LIGHT',
  S_TEMP = 'S_TEMP',
  S_FAN = 'S_FAN',
}

export type Device<T = any, K = any> = {
  location: string;
  id: string;
  nodeId: string;
  type: K;
  name: string;
  values: T;
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

export type TempSensor = Device<TempSensorValues, DeviceType.S_TEMP>;

type FanValues = {
  V_TEMP: number;
  V_PERCANTAGE: number;
  V_DIRECTION: number;
};

export type Fan = Device<FanValues, DeviceType.S_FAN>;

type ButtonValues = {
  V_LOCK_STATUS: string;
};

export type Button = Device<ButtonValues, DeviceType.S_LOCK>;
