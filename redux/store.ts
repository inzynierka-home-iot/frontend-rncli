import { configureStore } from '@reduxjs/toolkit';
import devicesSlice from './devicesSlice';
import currentTempSensorSlice from './currentTempSensorSlice';

export const store = configureStore({
  reducer: {
    devices: devicesSlice,
    currentTempSensorHistory: currentTempSensorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
