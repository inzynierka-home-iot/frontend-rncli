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
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
    },
  },
});

export const { setDevices } = devicesSlice.actions;

export const selectDevices = (state: RootState) => mockedData;

export default devicesSlice.reducer;

const mockedData = {
  devices: [
    {
      location: 'home-1',
      id: '0',
      node: '1',
      type: 'S_LIGHT',
      name: 'Green LED',
    },
    {
      location: 'home-1',
      id: '1',
      node: '1',
      type: 'S_TEMP',
      name: 'Temperature sensor',
    },
    {
      location: 'home-1',
      id: '2',
      node: '1',
      type: 'S_LIGHT',
      name: 'Yellow LED',
    },
    {
      location: 'home-1',
      id: '3',
      node: '1',
      type: 'S_LIGHT',
      name: 'Red LED',
    },
    { location: 'home-1', id: '4', node: '1', type: 'S_LOCK', name: 'Button' },
    { location: 'home-1', id: '5', node: '1', type: 'S_LOCK', name: 'Button' },
    { location: 'home-1', id: '6', node: '1', type: 'S_LOCK', name: 'Button' },
    {
      location: 'home-1',
      id: '7',
      node: '1',
      type: 'S_LIGHT',
      name: 'Red LED',
    },
    {
      location: 'home-1',
      id: '8',
      node: '1',
      type: 'S_LIGHT',
      name: 'Red LED',
    },
  ],
};
