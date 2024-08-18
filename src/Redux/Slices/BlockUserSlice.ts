/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

 type BlockUser = {
  success: boolean;
  message: string;
};

type BlockUserError = {
  success: boolean;
  message: string;
}

export const callBlockUser = createAsyncThunk(
  'callBlockUser',
  async (data: {blocked: string}, {rejectWithValue}) => {
    try {
      const response = await post<BlockUser>(Endpoints.blockUser, data);
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
  success: BlockUser | undefined;
  error: BlockUserError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const blockUserSlice = createSlice({
  name: 'BlockUserSlice',
  initialState,
  reducers: {
    resetBlockUserResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(callBlockUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(callBlockUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callBlockUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetBlockUserResponse} = blockUserSlice.actions;

export default blockUserSlice.reducer;
