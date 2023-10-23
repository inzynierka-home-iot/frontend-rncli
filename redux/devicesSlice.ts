import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../types';
import { RootState } from './store';

interface DeviceState {
  devices: Device[];
}

const initialState: DeviceState = {
  devices: [],
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setInitialDevice: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
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

export const { setInitialDevice, addDevice, removeDevice } =
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

// const mockedData = {
//   devices: [
//     {
//       location: 'home-1',
//       id: '0',
//       node: '1',
//       type: 'S_LIGHT',
//       name: 'Green LED',
//     },
//     {
//       location: 'home-1',
//       id: '1',
//       node: '1',
//       type: 'S_TEMP',
//       name: 'Temperature sensor',
//     },
//     {
//       location: 'home-1',
//       id: '2',
//       node: '1',
//       type: 'S_LIGHT',
//       name: 'Yellow LED',
//     },
//     {
//       location: 'home-1',
//       id: '3',
//       node: '1',
//       type: 'S_LIGHT',
//       name: 'Red LED',
//     },
//     { location: 'home-1', id: '4', node: '1', type: 'S_LOCK', name: 'Button' },
//     { location: 'home-1', id: '5', node: '1', type: 'S_LOCK', name: 'Button' },
//     { location: 'home-1', id: '6', node: '1', type: 'S_LOCK', name: 'Button' },
//     {
//       location: 'home-1',
//       id: '7',
//       node: '1',
//       type: 'S_LIGHT',
//       name: 'Red LED',
//     },
//     {
//       location: 'home-1',
//       id: '8',
//       node: '1',
//       type: 'S_LIGHT',
//       name: 'Red LED',
//     },
//   ],
// };
