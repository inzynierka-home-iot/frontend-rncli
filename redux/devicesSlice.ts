import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device, DeviceType } from '../types';
import { RootState } from './store';

interface DeviceState {
  devicesList: Device[];
  isLoading: boolean;
}

const mockedData = {
  devices: [
    {
      location: 'home-1',
      id: '0',
      nodeId: '1',
      type: DeviceType.S_BINARY,
      name: 'Green LED',
      values: {
        V_STATUS: '0',
        V_WATT: null,
      },
    },
    {
      location: 'home-1',
      id: '1',
      nodeId: '1',
      type: DeviceType.S_TEMP,
      name: 'Temp sensor',
      values: {
        V_TEMP: '23.375',
        V_ID: null,
      },
    },
    {
      location: 'home-1',
      id: '2',
      nodeId: '1',
      type: DeviceType.S_RGB_LIGHT,
      name: 'RGB Light',
      values: {
        V_RGB: 'ff0ac3',
      },
    },
    {
      location: 'home-1',
      id: '3',
      nodeId: '1',
      type: DeviceType.S_FAN,
      name: 'Fan',
      values: {
        V_TEMP: 24.5,
        V_PERCENTAGE: 34,
        V_DIRECTION: 128,
      },
    },
    {
      location: 'home-1',
      id: '4',
      nodeId: '1',
      type: DeviceType.S_DISTANCE,
      name: 'Czujnik odległości',
      values: {
        V_DISTANCE: 50,
      },
    },
    {
      location: 'home-1',
      id: '5',
      nodeId: '1',
      type: DeviceType.S_HUM,
      name: 'Czujnik wilgotności',
      values: {
        V_HUM: 30,
      },
    },
    {
      location: 'home-1',
      id: '6',
      nodeId: '1',
      type: DeviceType.S_LIGHT_LEVEL,
      name: 'Czujnik światła',
      values: {
        V_LIGHT_LEVEL: 27,
      },
    },
    {
      location: 'home-1',
      id: '7',
      nodeId: '1',
      type: DeviceType.S_MOTION,
      name: 'Czujnik ruchu',
      values: {
        V_LIGHT_LEVEL: 0,
      },
    },
  ] as Device[],
};

const initialState: DeviceState = {
  // devicesList: mockedData.devices,
  devicesList: [],
  isLoading: false,
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setInitialDevice: (state, action: PayloadAction<Device[]>) => {
      state.devicesList = action.payload;
      state.isLoading = false;
    },
    setDeviceValues: (
      state,
      action: PayloadAction<{
        location: string;
        nodeId: string;
        deviceId: string;
        values: any;
      }>,
    ) => {
      const { location, nodeId, deviceId, values } = action.payload;
      const searchedDevice = state.devicesList.find(
        device =>
          device.location === location &&
          device.nodeId === nodeId &&
          device.id === deviceId,
      );
      if (searchedDevice) {
        searchedDevice.values = {
          ...searchedDevice.values,
          ...values,
        };
      }
    },
    addDevice: (state, action: PayloadAction<Device>) => {
      state.devicesList.push(action.payload);
    },
    removeDevice: (state, action: PayloadAction<Device>) => {
      const { location, nodeId, id } = action.payload;
      state.devicesList = state.devicesList.filter(
        device =>
          device.location !== location ||
          device.nodeId !== nodeId ||
          device.id !== id,
      );
    },
    startLoading: state => {
      state.isLoading = true;
    },
    clearState: state => {
      state.devicesList = [];
      state.isLoading = true;
    },
  },
});

export const {
  setInitialDevice,
  setDeviceValues,
  addDevice,
  removeDevice,
  startLoading,
  clearState,
} = devicesSlice.actions;

export const selectDevices = (state: RootState) => state.devices.devicesList;

export const selectDevicesLoading = (state: RootState) =>
  state.devices.isLoading;

export const selectDeviceWithId = (
  state: RootState,
  location: string,
  nodeId: string,
  id: string,
) =>
  state.devices.devicesList.find(
    device =>
      device.location === location &&
      device.nodeId === nodeId &&
      device.id === id,
  );

export default devicesSlice.reducer;
