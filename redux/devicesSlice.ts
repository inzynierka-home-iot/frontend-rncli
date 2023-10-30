import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device, DeviceType } from '../types';
import { RootState } from './store';

interface DeviceState {
  devices: Device[];
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
      type: DeviceType.S_BINARY,
      name: 'Yellow LED',
      values: {
        V_STATUS: '1',
        V_WATT: null,
      },
    },
    {
      location: 'home-1',
      id: '3',
      nodeId: '1',
      type: DeviceType.S_BINARY,
      name: 'Red LED',
      values: {
        V_STATUS: '0',
        V_WATT: null,
      },
    },
    {
      location: 'home-1',
      id: '4',
      nodeId: '1',
      type: DeviceType.S_LOCK,
      name: 'Button',
      values: { V_LOCK_STATUS: '0' },
    },
    {
      location: 'home-1',
      id: '5',
      nodeId: '1',
      type: DeviceType.S_LOCK,
      name: 'Button',
      values: { V_LOCK_STATUS: '0' },
    },
    {
      location: 'home-1',
      id: '6',
      nodeId: '1',
      type: DeviceType.S_LOCK,
      name: 'Button',
      values: { V_LOCK_STATUS: '0' },
    },
    {
      location: 'home-1',
      id: '7',
      nodeId: '1',
      type: DeviceType.S_BINARY,
      name: 'Red LED',
      values: {
        V_STATUS: '1',
        V_WATT: null,
      },
    },
    {
      location: 'home-1',
      id: '8',
      nodeId: '1',
      type: DeviceType.S_BINARY,
      name: 'Red LED',
      values: {
        V_STATUS: '0',
        V_WATT: null,
      },
    },
  ],
};

const initialState: DeviceState = {
  devices: mockedData.devices,
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setInitialDevice: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
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
      const searchedDevice = state.devices.find(
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
      state.devices.push(action.payload);
    },
    removeDevice: (state, action: PayloadAction<Device>) => {
      const { location, nodeId, id } = action.payload;
      state.devices = state.devices.filter(
        device =>
          device.location !== location ||
          device.nodeId !== nodeId ||
          device.id !== id,
      );
    },
  },
});

export const { setInitialDevice, setDeviceValues, addDevice, removeDevice } =
  devicesSlice.actions;

export const selectDevices = (state: RootState) => state.devices;

export const selectDeviceWithId = (
  state: RootState,
  location: string,
  nodeId: string,
  id: string,
) =>
  state.devices.devices.find(
    device =>
      device.location === location &&
      device.nodeId === nodeId &&
      device.id === id,
  );

export default devicesSlice.reducer;
