export enum DeviceType {
  S_LIGHT = 'S_LIGHT',
  S_TEMP = 'S_TEMP',
  S_LOCK = 'S_LOCK',
}

export type Device = {
  location: string;
  id: string;
  nodeId: string;
  type: DeviceType;
  name: string;
};
