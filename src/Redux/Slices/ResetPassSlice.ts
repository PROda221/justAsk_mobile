/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

 type ResetPass = {
  success: boolean;
  message: string;
};

type ResetPassError = {
  success: boolean;
  message: string;
}

export const callResetPass = createAsyncThunk(
  'callResetPass',
  async (data: {emailId: string; otp: string, password: string}, {rejectWithValue}) => {
    try {
      const response = await post<ResetPass>(Endpoints.forgotPass, data);
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState: {
  success: ResetPass | undefined;
  error: ResetPassError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const resetPassSlice = createSlice({
  name: 'resetPassSlice',
  initialState,
  reducers: {
    resetClearPassResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callResetPass.pending, state => {
      state.loading = true;
    });
    builder.addCase(callResetPass.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callResetPass.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetClearPassResponse} = resetPassSlice.actions;

export default resetPassSlice.reducer;
