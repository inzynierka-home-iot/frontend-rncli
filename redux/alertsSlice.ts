import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Alert } from '../types';

export type AlertMessage = {
  id: number;
} & Alert;

interface MessagesState {
  id: number;
  alertsList: AlertMessage[];
}

let alertID = 0;

const mockedData = {
  alerts: [
    {
      id: alertID++,
      variant: 'informative',
      text: 'Dzień dobry',
    },
    {
      id: alertID++,
      variant: 'error',
      text: 'Lamp broke',
    },
    {
      id: alertID++,
      variant: 'success',
      text: 'Lamp turned on',
    },
  ] as AlertMessage[],
};

const initialState: MessagesState = {
  id: alertID,
  alertsList: mockedData.alerts,
};

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      const id = ++state.id;
      const alertMessage = {
        id,
        ...action.payload,
      };
      state.alertsList.push(alertMessage);
    },
    removeAlert: (state, action: PayloadAction<AlertMessage>) => {
      const { id } = action.payload;
      state.alertsList = state.alertsList.filter(alert => alert.id !== id);
    },
  },
});

export const { addAlert, removeAlert } = alertsSlice.actions;

export const selectAlerts = (state: RootState) => state.alerts.alertsList;

export default alertsSlice.reducer;
