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

export const selectDevices = (state: RootState) => state.devices;

export default devicesSlice.reducer;
