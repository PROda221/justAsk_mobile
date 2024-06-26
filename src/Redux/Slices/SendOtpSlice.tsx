/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';

type SendOtp = {
  success: boolean;
  message: string;
  otp: string;
};

type SendOtpError = {
  success: boolean;
  message: string;
};

export const callSendOtp = createAsyncThunk(
  'callSendOtp',
  async (data: {emailId: string}, {rejectWithValue}) => {
    try {
      const response = await post<SendOtp>(Endpoints.sendOtp, data);
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
  success: SendOtp | undefined;
  error: SendOtpError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const sendOtpSlice = createSlice({
  name: 'sendOtpSlice',
  initialState,
  reducers: {
    resetSendOtpResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callSendOtp.pending, state => {
      state.loading = true;
    });
    builder.addCase(callSendOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callSendOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetSendOtpResponse} = sendOtpSlice.actions;

export default sendOtpSlice.reducer;
