/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

 type UnblockUser = {
  success: boolean;
  message: string;
};

type UnblockUserError = {
  success: boolean;
  message: string;
}

export const callUnblockUser = createAsyncThunk(
  'callUnblockUser',
  async (data: {blocked: string}, {rejectWithValue}) => {
    try {
      const response = await post<UnblockUser>(Endpoints.unblockUser, data);
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
  success: UnblockUser | undefined;
  error: UnblockUserError | undefined;
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
    resetUnblockUserResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(callUnblockUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(callUnblockUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callUnblockUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetUnblockUserResponse} = unblockUserSlice.actions;

export default unblockUserSlice.reducer;
