import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  isWaitingForName: boolean;
  isWaitingForId: boolean;
}

const initialState: AdminState = {
  isWaitingForName: false,
  isWaitingForId: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setIsWaitingForName: (state, action: PayloadAction<boolean>) => {
      state.isWaitingForName = action.payload;
    },
    setIsWaitingForId: (state, action: PayloadAction<boolean>) => {
      state.isWaitingForId = action.payload;
    },
  },
});

export const { setIsWaitingForName, setIsWaitingForId } = adminSlice.actions;

export default adminSlice.reducer;
