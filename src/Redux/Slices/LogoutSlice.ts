/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';

type Logout = {
  success: string;
  message: string;
};

type LogoutError = {
  success: boolean;
  message: string;
};

export const callLogout = createAsyncThunk(
  'callLogout',
  async (_, {rejectWithValue}) => {
    try {
      const response = await get<Logout>(Endpoints.logout);
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
  success: Logout | undefined;
  error: LogoutError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const logoutSlice = createSlice({
  name: 'LogoutSlice',
  initialState,
  reducers: {
    resetLogoutResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callLogout.pending, state => {
      state.loading = true;
    });
    builder.addCase(callLogout.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetLogoutResponse} = logoutSlice.actions;

export default logoutSlice.reducer;
