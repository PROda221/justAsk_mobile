/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';

type DeactivateAccount = {
  success: string;
  message: string;
};

type DeactivateAccountError = {
  success: boolean;
  message: string;
};

export const callDeactivateAccount = createAsyncThunk(
  'callDeactivateAccount',
  async (_, {rejectWithValue}) => {
    try {
      const response = await get<DeactivateAccount>(Endpoints.deactivate);
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
  success: DeactivateAccount | undefined;
  error: DeactivateAccountError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const deactivateAccountSlice = createSlice({
  name: 'DeactivateAccountSlice',
  initialState,
  reducers: {
    resetDeactivateAccountResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callDeactivateAccount.pending, state => {
      state.loading = true;
    });
    builder.addCase(callDeactivateAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callDeactivateAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetDeactivateAccountResponse} = deactivateAccountSlice.actions;

export default deactivateAccountSlice.reducer;
