export enum DeviceType {
  S_BINARY = 'S_BINARY',
  S_TEMP = 'S_TEMP',
  S_LOCK = 'S_LOCK',
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

type TemperatureSensorValues = {
  V_STATUS: string;
  V_ID?: string;
};

export type TemperatureSensor = Device<
  TemperatureSensorValues,
  DeviceType.S_TEMP
>;

type ButtonValues = {
  V_LOCK_STATUS: string;
};

export type Button = Device<ButtonValues, DeviceType.S_LOCK>;
