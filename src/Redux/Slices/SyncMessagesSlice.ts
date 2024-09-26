/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

export type Messages = {
    senderId: string;
    receiverId: string;
    message: string;
    type: string;
    timeStamp: Date;
}

 type SyncMessages = {
  success: boolean;
  message: string;
  data: Messages[];
};

type SyncMessagesError = {
  success: boolean;
  message: string;
}

export const callSyncMessages = createAsyncThunk(
  'callSyncMessages',
  async (data: {senderId: string; receiverId: string; messageId: string}, {rejectWithValue}) => {
    try {
      const response = await post<SyncMessages>(Endpoints.syncMessages, data);
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      console.log('error in callSyncMessages :', err)
      return rejectWithValue(err);
    }
  },
);

const initialState: {
  success: SyncMessages | undefined;
  error: SyncMessagesError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const syncMessagesSlice = createSlice({
  name: 'SyncMessagesSlice',
  initialState,
  reducers: {
    resetSyncMessages(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(callSyncMessages.pending, state => {
      state.loading = true;
    });
    builder.addCase(callSyncMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callSyncMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetSyncMessages} = syncMessagesSlice.actions;

export default syncMessagesSlice.reducer;
