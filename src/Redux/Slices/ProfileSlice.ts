/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig';
import { Endpoints } from '../../Api/Endpoints';

 type Profile = {
  username: string;
  emailId: string;
  status: string;
  profilePic: string;
  message: string;
  adviceGenre: string[];
  averageRating: Array<{_id: string; averageStars: number}>
};

type ProfileError = {
  success: boolean;
  message: string;
}

export const callGetProfile = createAsyncThunk(
  'callGetProfile',
  async (_, {rejectWithValue}) => {
    try {
      const response = await get<Profile>(Endpoints.profile);
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
  success: Profile | undefined;
  error: ProfileError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const profileSlice = createSlice({
  name: 'ProfileSlice',
  initialState,
  reducers: {
    resetProfileResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },

  extraReducers(builder) {
    builder.addCase(callGetProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(callGetProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.error = undefined;
    });
    builder.addCase(callGetProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = undefined;
    });
  },
});

export const {resetProfileResponse} = profileSlice.actions;

export default profileSlice.reducer;
