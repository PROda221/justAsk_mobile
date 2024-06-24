/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

type UserDetails = {
    username: string;
    adviceGenre: string[];
    averageRating: Array<{_id: string; averageStars: number}>
    status: string;
    profilePic: string;
}

 type UserProfile = {
  response: {userDetails: UserDetails, success: boolean}
  success: boolean;
};

type UserProfileError = {
  success: boolean;
  message: number;
}

export const callGetUserProfile = createAsyncThunk(
  'callGetUserProfile',
  async (data: {username:string}, {rejectWithValue}) => {
    try {
      const response = await post<UserProfile>(Endpoints.userProfile, data);
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
        const serializableError = {
            message: err.message,
            success: err.success,
          }
      return rejectWithValue(serializableError);
    }
  },
);

const initialState: {
  success: UserProfile | undefined;
  error: UserProfileError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const userProfileSlice = createSlice({
  name: 'userProfileSlice',
  initialState,
  reducers: {
    resetUserProfileResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(callGetUserProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(callGetUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callGetUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetUserProfileResponse} = userProfileSlice.actions;

export default userProfileSlice.reducer;
