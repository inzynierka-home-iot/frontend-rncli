import { configureStore } from '@reduxjs/toolkit';
import devicesSlice from './devicesSlice';

export const store = configureStore({
  reducer: {
    devices: devicesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
