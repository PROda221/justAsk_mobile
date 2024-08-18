/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';
import { Moment } from 'moment';

export type BlockedUser = {
  blocker: string;
  blocked: string;
  blockedImg: string;
  updatedAt: Moment;
};

type AllBlocked = {
  success: boolean;
  limit: number;
  data: BlockedUser[];
  lastId: string;
};

type AllBlockedError = {
  success: boolean;
  message: string;
  status: number;
};

export const callAllBlocked = createAsyncThunk(
  'callAllBlocked',
  async (data: {limit: number; lastId: string}, {rejectWithValue}) => {
    try {
      const response = await get<AllBlocked>(Endpoints.getAllBlocked, data);
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
  success: AllBlocked | undefined;
  error: AllBlockedError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const unblockUserSlice = createSlice({
  name: 'UnblockUserSlice',
  initialState,
  reducers: {
    resetAllBlockedResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callAllBlocked.pending, state => {
      state.loading = true;
    });
    builder.addCase(callAllBlocked.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callAllBlocked.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetAllBlockedResponse} = unblockUserSlice.actions;

export default unblockUserSlice.reducer;
