import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device, DeviceType } from '../types';
import { RootState } from './store';
// import { mockedData } from './mocks/mockedDevices';

interface DeviceState {
  devicesList: Device[];
  isLoading: boolean;
}

const initialState: DeviceState = {
  // devicesList: mockedData.devices,
  // isLoading: false,
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
    setDeviceSchedule: (
      state,
      action: PayloadAction<{
        location: string;
        nodeId: string;
        deviceId: string;
        schedule: any;
      }>,
    ) => {
      const { location, nodeId, deviceId, schedule } = action.payload;
      const searchedDevice = state.devicesList.find(
        device =>
          device.location === location &&
          device.nodeId === nodeId &&
          device.id === deviceId,
      );
      if (searchedDevice) {
        searchedDevice.schedule = schedule;
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
    clearDeviceState: state => {
      state.devicesList = [];
      state.isLoading = true;
    },
  },
});

export const {
  setInitialDevice,
  setDevicesValues,
  setDeviceSchedule,
  addDevice,
  removeDevice,
  clearDeviceState,
} = devicesSlice.actions;

export const selectDevices = (state: RootState) =>
  state.devices.devicesList.filter(
    ({ type }) =>
      type !== 'S_ARDUINO_REPEATER_NODE' && type !== 'S_ARDUINO_NODE',
  );

export const selectDevicesLoading = (state: RootState) =>
  state.devices.isLoading;

export const selectDeviceTypes = createSelector(
  [selectDevices],
  (devices): DeviceType[] => [...new Set(devices.map(device => device.type))],
);

export const selectDevicesWithType = createSelector(
  [selectDevices, (_, type: DeviceType) => type],
  (devices, type) => devices.filter(device => device.type === type),
);

export const selectNodesWithType = createSelector(
  [selectDevicesWithType],
  devices => [...new Set(devices.map(({ nodeId }) => nodeId))],
);

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

export default devicesSlice.reducer;
