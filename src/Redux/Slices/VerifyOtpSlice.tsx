/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';

type VerifyOtp = {
  success: boolean;
  message: string;
};

type VerifyOtpError = {
  success: boolean;
  message: number;
};

export const callVerifyOtp = createAsyncThunk(
  'callVerifyOtp',
  async (data: {emailId: string; otp: string}, {rejectWithValue}) => {
    try {
      const response = await post<VerifyOtp>(Endpoints.verifyOtp, data);
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
  success: VerifyOtp | undefined;
  error: VerifyOtpError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const verifyOtpSlice = createSlice({
  name: 'verifyOtpSlice',
  initialState,
  reducers: {
    resetVerifyOtpResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callVerifyOtp.pending, state => {
      state.loading = true;
    });
    builder.addCase(callVerifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callVerifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetVerifyOtpResponse} = verifyOtpSlice.actions;

export default verifyOtpSlice.reducer;
