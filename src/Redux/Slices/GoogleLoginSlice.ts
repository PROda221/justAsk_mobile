/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

 type GoogleLogin = {
  access_token?: string;
  message: string;
  googleData?: {
    email: string;
    name: string;
    uid: string;
  }
};

type GoogleLoginError = {
  success: boolean;
  message: string;
}

export const callGoogleTokenGenerator = createAsyncThunk(
  'callGoogleTokenGenerator',
  async (data: {idToken: string}, {rejectWithValue}) => {
    try {
      const response = await post<GoogleLogin>(Endpoints.googleLogin, data);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState: {
  success: GoogleLogin | undefined;
  error: GoogleLoginError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const googleloginSlice = createSlice({
  name: 'googleloginSlice',
  initialState,
  reducers: {
    resetGoogleLoginResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callGoogleTokenGenerator.pending, state => {
      state.loading = true;
    });
    builder.addCase(callGoogleTokenGenerator.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callGoogleTokenGenerator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetGoogleLoginResponse} = googleloginSlice.actions;

export default googleloginSlice.reducer;
