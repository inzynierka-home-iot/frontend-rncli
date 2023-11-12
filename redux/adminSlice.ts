import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  isWaitingForName: boolean;
  isWaitingForUsername: boolean;
  isUsernameTakenError: boolean;
  isUsernameInvalidError: boolean;
  newBotToken: string;
}

const initialState: AdminState = {
  isWaitingForName: false,
  isWaitingForUsername: false,
  isUsernameTakenError: false,
  isUsernameInvalidError: false,
  newBotToken: '',
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
  },
});

export const {
  setIsWaitingForName,
  setIsWaitingForUsername,
  setIsUsernameTakenError,
  setIsUsernameInvalidError,
  setNewBotToken,
} = adminSlice.actions;

export default adminSlice.reducer;
