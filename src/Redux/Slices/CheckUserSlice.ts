 
 
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';


type CheckUser = {
  success: boolean;
  message: string;  
}

type CheckUserError = {
  success: boolean;
  message: string;
}

export const callCheckUser = createAsyncThunk(
  'callCheckUser',
  async (data: {username: string; password: string; emailId: string}, {rejectWithValue}) => {
    try {
      const response = await post<CheckUser>(Endpoints.checkUser, data);
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
  success: CheckUser | undefined;
  error: CheckUserError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const checkUserSlice = createSlice({
  name: 'checkUserSlice',
  initialState,
  reducers: {
    resetCheckUserResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(callCheckUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(callCheckUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callCheckUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetCheckUserResponse} = checkUserSlice.actions;

export default checkUserSlice.reducer;
