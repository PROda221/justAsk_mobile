 
 
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

export const callCheckUsername = createAsyncThunk(
  'callCheckUsername',
  async (data: {username: string}, {rejectWithValue}) => {
    try {
      const response = await post<CheckUser>(Endpoints.checkUsername, data);
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);


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
  checkUser: {
    success: CheckUser | undefined;
    error: CheckUserError | undefined;
    loading: boolean;
  };

  checkUsername: {
    success: CheckUser | undefined;
    error: CheckUserError | undefined;
    loading: boolean;
  };
 
} = {
  checkUser: {
    success: undefined,
    error: undefined,
    loading: false,
  },

  checkUsername: {
    success: undefined,
    error: undefined,
    loading: false,
  },
 
};

const checkUserSlice = createSlice({
  name: 'checkUserSlice',
  initialState,
  reducers: {
    resetCheckUserResponse(state) {
      state.checkUser.success = undefined;
      state.checkUser.loading = false;
      state.checkUser.error = undefined;
    },
    resetCheckUsernameResponse(state) {
      state.checkUsername.success = undefined;
      state.checkUsername.loading = false;
      state.checkUsername.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(callCheckUser.pending, state => {
      state.checkUser.loading = true;
    });
    builder.addCase(callCheckUser.fulfilled, (state, action) => {
      state.checkUser.loading = false;
      state.checkUser.success = action.payload;
    });
    builder.addCase(callCheckUser.rejected, (state, action) => {
      state.checkUser.loading = false;
      state.checkUser.error = action.payload;
    });
    builder.addCase(callCheckUsername.pending, state => {
      state.checkUsername.loading = true;
    });
    builder.addCase(callCheckUsername.fulfilled, (state, action) => {
      state.checkUsername.loading = false;
      state.checkUsername.success = action.payload;
    });
    builder.addCase(callCheckUsername.rejected, (state, action) => {
      state.checkUsername.loading = false;
      state.checkUsername.error = action.payload;
    });
  },
});

export const {resetCheckUserResponse, resetCheckUsernameResponse} = checkUserSlice.actions;

export default checkUserSlice.reducer;
