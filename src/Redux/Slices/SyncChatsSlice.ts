/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

type LatestMessage = {
  message: string;
  createdAt: Date;
  _id: string;
  type: string;
  senderId: string;
  receiverId: string;
}

export type Chats = {
    username: string;
    adviveGenre: string[];
    status: string;
    profilePic: string;
    unreadCount: number;
    latestMessage: LatestMessage[];
}

 type SyncChat = {
  success: boolean;
  message: string;
  data: Chats[];
};

type SyncChatError = {
  success: boolean;
  message: string;
}

export const callSyncChats = createAsyncThunk(
  'callSyncChats',
  async (data: {accountUsername: string}, {rejectWithValue}) => {
    try {
      const response = await post<SyncChat>(Endpoints.syncChats, data);
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      console.log('error in callSyncChats :', err)
      return rejectWithValue(err);
    }
  },
);

const initialState: {
  success: SyncChat | undefined;
  error: SyncChatError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const syncChatsSlice = createSlice({
  name: 'SyncChatsSlice',
  initialState,
  reducers: {
    resetSyncChats(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(callSyncChats.pending, state => {
      state.loading = true;
    });
    builder.addCase(callSyncChats.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callSyncChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetSyncChats} = syncChatsSlice.actions;

export default syncChatsSlice.reducer;
