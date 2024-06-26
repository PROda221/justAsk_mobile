 
 
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

 type SignUp = {
  successs: string;
  message: string;
};

type SignUpError = {
  success: boolean;
  message: string;
}

export const callSignIn = createAsyncThunk(
  'callSignIn',
  async (data: {username: string; password: string; emailId: string; adviceGenre: Array<string>}, {rejectWithValue}) => {
    try {
      const response = await post<SignUp>(Endpoints.signUp, data);
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
  success: SignUp | undefined;
  error: SignUpError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {
    resetSignUpResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(callSignIn.pending, state => {
      state.loading = true;
    });
    builder.addCase(callSignIn.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callSignIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetSignUpResponse} = signUpSlice.actions;

export default signUpSlice.reducer;
