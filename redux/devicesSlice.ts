import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      name: 'Temp sensor 1',
      values: {
        V_TEMP: '23.375',
        V_ID: null,
      },
      schedule: {
        action: 'getTemp',
        hours: '22',
        minutes: '32',
        days: '4,5',
      },
    },
    {
      location: 'home-1',
      id: '8',
      nodeId: '1',
      type: DeviceType.S_TEMP,
      name: 'Temp sensor 2',
      values: {
        V_TEMP: '23.375',
        V_ID: null,
      },
      schedule: {},
    },
    {
      location: 'home-1',
      id: '2',
      nodeId: '1',
      type: DeviceType.S_RGB_LIGHT,
      name: 'RGB Light',
      values: {
        V_RGB: '60ffa2',
      },
    },
    {
      location: 'home-1',
      id: '3',
      nodeId: '1',
      type: DeviceType.S_FAN,
      name: 'Fan',
      values: {
        V_TEMP: '24.5',
        V_PERCENTAGE: '34',
        V_DIRECTION: '128',
      },
      schedule: {
        action: 'maintain',
        location: 'home-1',
        nodeId: '1',
        id: '1',
        V_TEMP: '25',
      },
    },
    {
      location: 'home-1',
      id: '5',
      nodeId: '2',
      type: DeviceType.S_FAN,
      name: 'Fan',
      values: {
        V_TEMP: '24.5',
        V_PERCENTAGE: '34',
        V_DIRECTION: '128',
      },
      schedule: {},
    },
    {
      location: 'home-1',
      id: '4',
      nodeId: '1',
      type: DeviceType.S_DISTANCE,
      name: 'Czujnik odległości',
      values: {
        V_DISTANCE: '50',
      },
    },
    {
      location: 'home-1',
      id: '5',
      nodeId: '1',
      type: DeviceType.S_HUM,
      name: 'Czujnik wilgotności',
      values: {
        V_HUM: '30',
      },
    },
    {
      location: 'home-1',
      id: '6',
      nodeId: '1',
      type: DeviceType.S_LIGHT_LEVEL,
      name: 'Czujnik światła',
      values: {
        V_LIGHT_LEVEL: '27',
      },
    },
    {
      location: 'home-1',
      id: '7',
      nodeId: '1',
      type: DeviceType.S_MOTION,
      name: 'Czujnik ruchu',
      values: {
        V_LIGHT_LEVEL: '0',
      },
    },
  ] as Device[],
};

const initialState: DeviceState = {
  // devicesList: mockedData.devices,
  devicesList: [],
  isLoading: true,
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setInitialDevice: (state, action: PayloadAction<Device[]>) => {
      state.devicesList = action.payload;
      state.isLoading = false;
    },
    setDevicesValues: (
      state,
      action: PayloadAction<{
        location: string;
        nodeId: string;
        deviceId: string;
        values: any;
      }>,
    ) => {
      const { location, nodeId, deviceId, values } = action.payload;
      const searchedDevices = state.devicesList.filter(
        device =>
          (device.location === location || location === '*') &&
          (device.nodeId === nodeId || nodeId === '*') &&
          (device.id === deviceId || deviceId === '*'),
      );
      for (const device of searchedDevices) {
        device.values = {
          ...device.values,
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
    startLoadingDevices: state => {
      state.isLoading = true;
    },
    clearDeviceState: state => {
      state.devicesList = [];
      state.isLoading = true;
    },
  },
});

export const {
  setInitialDevice,
  setDevicesValues,
  addDevice,
  removeDevice,
  startLoadingDevices,
  clearDeviceState,
} = devicesSlice.actions;

export const selectDevices = (state: RootState) => state.devices.devicesList;

export const selectDevicesLoading = (state: RootState) =>
  state.devices.isLoading;

export const selectDeviceWithId = createSelector(
  [
    selectDevices,
    (_, location: string) => location,
    (_, _arg1, nodeId: string) => nodeId,
    (_, _arg1, _arg2, id: string) => id,
  ],
  (devices, location, nodeId, id) =>
    devices.find(
      device =>
        device.location === location &&
        device.nodeId === nodeId &&
        device.id === id,
    ),
);

export const selectDevicesWithType = createSelector(
  [selectDevices, (_, type: DeviceType) => type],
  (devices, type) => devices.filter(device => device.type === type),
);

export default devicesSlice.reducer;
