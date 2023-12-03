import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ChartData } from '../types';

interface TempSensorState {
  currentTempSensorHistory: ChartData[];
  subscription: boolean;
}

const mockedData = {
  currentTempSensorHistory: [
    { index: '1', value: 23.255 },
    { index: '2', value: 24.546 },
    { index: '3', value: 22.342 },
    { index: '4', value: 25.362 },
    { index: '5', value: 27.355 },
    { index: '6', value: 24.825 },
    { index: '7', value: 21.367 },
  ] as ChartData[],
  subscription: false,
};

const initialState: TempSensorState = {
  currentTempSensorHistory: mockedData.currentTempSensorHistory,
  subscription: mockedData.subscription,
};

export const currentTempSensorSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setTempHistory: (state, action: PayloadAction<number[]>) => {
      state.currentTempSensorHistory = action.payload.map((number, index) => ({
        index: index.toString(),
        value: number,
      }));
    },
    setTempSubscription: (state, action: PayloadAction<boolean>) => {
      state.subscription = action.payload;
    },
  },
});

export const { setTempHistory, setTempSubscription } =
  currentTempSensorSlice.actions;

export const selectTempSensorHistory = (state: RootState) =>
  state.tempSensor.currentTempSensorHistory;

export const selectTempSensorSubscription = (state: RootState) =>
  state.tempSensor.subscription;

export default currentTempSensorSlice.reducer;
