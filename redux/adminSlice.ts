import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  isWaitingForName: boolean;
  isWaitingForUsername: boolean;
  isUsernameTakenError: boolean;
  isUsernameInvalidError: boolean;
  newBotToken: string;
  botsNames: string[] | undefined;
}

const initialState: AdminState = {
  isWaitingForName: false,
  isWaitingForUsername: false,
  isUsernameTakenError: false,
  isUsernameInvalidError: false,
  newBotToken: '',
  botsNames: undefined,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setIsWaitingForName: (state, action: PayloadAction<boolean>) => {
      state.isWaitingForName = action.payload;
    },
    setIsWaitingForUsername: (state, action: PayloadAction<boolean>) => {
      state.isWaitingForUsername = action.payload;
    },
    setIsUsernameTakenError: (state, action: PayloadAction<boolean>) => {
      state.isUsernameTakenError = action.payload;
    },
    setIsUsernameInvalidError: (state, action: PayloadAction<boolean>) => {
      state.isUsernameInvalidError = action.payload;
    },
    setNewBotToken: (state, action: PayloadAction<string>) => {
      state.newBotToken = action.payload;
    },
    setBotsNames: (state, action: PayloadAction<string[]>) => {
      state.botsNames = action.payload;
    },
  },
});

export const {
  setIsWaitingForName,
  setIsWaitingForUsername,
  setIsUsernameTakenError,
  setIsUsernameInvalidError,
  setNewBotToken,
  setBotsNames,
} = adminSlice.actions;

export default adminSlice.reducer;
