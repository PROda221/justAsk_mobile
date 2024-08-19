/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';

type ActivateAccount = {
  success: string;
  message: string;
};

type ActivateAccountError = {
  success: boolean;
  message: string;
};

export const callActivateAccount = createAsyncThunk(
  'callActivateAccount',
  async (_, {rejectWithValue}) => {
    try {
      const response = await get<ActivateAccount>(Endpoints.activate);
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
  success: ActivateAccount | undefined;
  error: ActivateAccountError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const activateAccountSlice = createSlice({
  name: 'ActivateAccountSlice',
  initialState,
  reducers: {
    resetActivateAccountResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callActivateAccount.pending, state => {
      state.loading = true;
    });
    builder.addCase(callActivateAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callActivateAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetActivateAccountResponse} = activateAccountSlice.actions;

export default activateAccountSlice.reducer;
