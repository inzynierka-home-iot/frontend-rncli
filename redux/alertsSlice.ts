import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Alert } from '../types';

export type AlertMessage = {
  id: string;
} & Alert;

interface MessagesState {
  alertsList: AlertMessage[];
}

const mockedData = {
  alerts: [
    {
      id: nanoid(),
      variant: 'informative',
      text: 'Dzień dobry',
    },
    {
      id: nanoid(),
      variant: 'error',
      text: 'Lamp broke',
    },
    {
      id: nanoid(),
      variant: 'success',
      text: 'Lamp turned on',
    },
  ] as AlertMessage[],
};

const initialState: MessagesState = {
  alertsList: mockedData.alerts,
  // alertsList: [],
};

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      const id = nanoid();
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
