import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../types';
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
      type: 'S_LIGHT',
      name: 'Green LED',
    },
    {
      location: 'home-1',
      id: '1',
      nodeId: '1',
      type: 'S_TEMP',
      name: 'Temperature sensor',
    },
    {
      location: 'home-1',
      id: '2',
      nodeId: '1',
      type: 'S_LIGHT',
      name: 'Yellow LED',
    },
    {
      location: 'home-1',
      id: '3',
      nodeId: '1',
      type: 'S_LIGHT',
      name: 'Red LED',
    },
    {
      location: 'home-1',
      id: '4',
      nodeId: '1',
      type: 'S_LOCK',
      name: 'Button',
    },
    {
      location: 'home-1',
      id: '5',
      nodeId: '1',
      type: 'S_LOCK',
      name: 'Button',
    },
    {
      location: 'home-1',
      id: '6',
      nodeId: '1',
      type: 'S_LOCK',
      name: 'Button',
    },
    {
      location: 'home-1',
      id: '7',
      nodeId: '1',
      type: 'S_LIGHT',
      name: 'Red LED',
    },
    {
      location: 'home-1',
      id: '8',
      nodeId: '1',
      type: 'S_LIGHT',
      name: 'Red LED',
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
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
    },
  },
});

export const { setDevices } = devicesSlice.actions;

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
