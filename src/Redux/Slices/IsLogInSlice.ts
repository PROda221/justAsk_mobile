/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice} from '@reduxjs/toolkit';


const initialState: {
  isLogin: boolean;
} = {
  isLogin: false,
};

const isLoginSlice = createSlice({
  name: 'isLoginSlice',
  initialState,
  reducers: {
    setLoginTrue(state) {
      state.isLogin = true;
    },
    setLoginFalse(state) {
      state.isLogin = false;
    },
  },
});

export const {setLoginTrue, setLoginFalse} = isLoginSlice.actions;

export default isLoginSlice.reducer;
