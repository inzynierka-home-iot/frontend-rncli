import { configureStore } from '@reduxjs/toolkit';
import devicesSlice from './devicesSlice';
import currentTempSensorSlice from './currentTempSensorSlice';
import adminSlice from './adminSlice';
import alertsSlice from './alertsSlice';

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    devices: devicesSlice,
    alerts: alertsSlice,
    tempSensor: currentTempSensorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
