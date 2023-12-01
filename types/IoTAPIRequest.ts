export type IoTAPIRequest = {
  location: string;
  nodeId: string;
  deviceId: string;
  action: string;
  additionalParams?: string | object;
  deviceType?: string;
  botHash: string | null;
  botId: string | null;
};
