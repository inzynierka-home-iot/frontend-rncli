import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import devicesSlice from './devicesSlice';
import currentTempSensorSlice from './currentTempSensorSlice';
import adminSlice from './adminSlice';
import alertsSlice from './alertsSlice';

const appReducer = combineReducers({
  admin: adminSlice,
  devices: devicesSlice,
  alerts: alertsSlice,
  tempSensor: currentTempSensorSlice,
});

const reducerProxy = (state: any, action: AnyAction) => {
  if (action.type === 'logout') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
