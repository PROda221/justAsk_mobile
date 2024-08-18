/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';

type MultiUnblock = {
  success: boolean;
  message: string;
};

type MultiUnblockError = {
  success: boolean;
  message: string;
  status: number;
};

export const callMultiUnblock = createAsyncThunk(
  'callMultiUnblock',
  async (data: {blocked: string[]}, {rejectWithValue}) => {
    try {
      const response = await post<MultiUnblock>(Endpoints.multiUnblock, data);
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
  success: MultiUnblock | undefined;
  error: MultiUnblockError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const multiUnblockSlice = createSlice({
  name: 'multiUnblockSlice',
  initialState,
  reducers: {
    resetMultiUnblockResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callMultiUnblock.pending, state => {
      state.loading = true;
    });
    builder.addCase(callMultiUnblock.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callMultiUnblock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetMultiUnblockResponse} = multiUnblockSlice.actions;

export default multiUnblockSlice.reducer;
