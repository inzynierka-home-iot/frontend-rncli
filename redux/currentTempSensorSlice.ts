import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ChartData } from '../types';

interface TempSensorState {
  currentTempSensorHistory: ChartData[];
  subscription: boolean;
}

const mockedData = {
  currentTempSensorHistory: [
    { date: '1', value: 23.255 },
    { date: '2', value: 24.546 },
    { date: '3', value: 22.342 },
    { date: '4', value: 25.362 },
    { date: '5', value: 27.355 },
    { date: '6', value: 24.825 },
    { date: '7', value: 21.367 },
  ] as ChartData[],
  subscription: false,
};

const initialState: TempSensorState = {
  currentTempSensorHistory: mockedData.currentTempSensorHistory,
  subscription: mockedData.subscription,
};

const currentTempSensorSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setTempHistory: (state, action: PayloadAction<ChartData[]>) => {
      state.currentTempSensorHistory = action.payload;
    },
    setTempSubscription: (state, action: PayloadAction<boolean>) => {
      state.subscription = action.payload;
    },
  },
});

export const { setTempHistory, setTempSubscription } =
  currentTempSensorSlice.actions;

export const selectTempSensorState = (state: RootState) => state.tempSensor;

export default currentTempSensorSlice.reducer;
