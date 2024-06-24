/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { post } from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

 type Notification = {
  status: string;
  message: string;
};

type NotificationError = {
  success: boolean;
  message: number;
}

export const sendDeviceToken = createAsyncThunk(
  'sendDeviceToken',
  async (data: {deviceToken: string}, {rejectWithValue}) => {
    try {
      const response = await post<Notification>(Endpoints.deviceToken, data);
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
        const serializableError = {
            message: err.message,
            success: err.success,
          }
      return rejectWithValue(serializableError);
    }
  },
);

const initialState: {
  success: Notification | undefined;
  error: NotificationError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {
    resetNotificationResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(sendDeviceToken.pending, state => {
      state.loading = true;
    });
    builder.addCase(sendDeviceToken.fulfilled, (state, action) => {
        console.log('success :', action.payload)
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(sendDeviceToken.rejected, (state, action) => {
        console.log('error :', action.payload)
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetNotificationResponse} = notificationSlice.actions;

export default notificationSlice.reducer;
