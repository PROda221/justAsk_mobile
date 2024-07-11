/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice} from '@reduxjs/toolkit';

const initialState: {
  inChatScreen: boolean;
} = {
  inChatScreen: false,
};

const localReducer = createSlice({
  name: 'localReducer',
  initialState,
  reducers: {
    setInChatScreen(state, action) {
      state.inChatScreen = action.payload;
    },
  },
});

export const {setInChatScreen} = localReducer.actions;

export default localReducer.reducer;
