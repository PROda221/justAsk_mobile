/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

 type Login = {
  access_token: string;
  message: string;
};

type LoginError = {
  success: string;
  message: number;
}

export const callTokenGenerator = createAsyncThunk(
  'callTokenGenerator',
  async (data: {username: string; password: string}, {rejectWithValue}) => {
    try {
      const response = await post<Login>(Endpoints.login, data);
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
  storedAccessToken: string;
  success: Login | undefined;
  error: LoginError | undefined;
  loading: boolean;
} = {
  storedAccessToken: '',
  success: undefined,
  error: undefined,
  loading: false,
};

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    resetLoginResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
    setAccessToken(state, action){
      state.storedAccessToken = action.payload
    }
  },

  extraReducers(builder) {
    builder.addCase(callTokenGenerator.pending, state => {
      state.loading = true;
    });
    builder.addCase(callTokenGenerator.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callTokenGenerator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetLoginResponse, setAccessToken} = loginSlice.actions;

export default loginSlice.reducer;
