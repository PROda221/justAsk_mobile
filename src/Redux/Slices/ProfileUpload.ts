/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Endpoints} from '../../Api/Endpoints';
import {post} from '../../Api/AxiosConfig';

type ProfileUpload = {
  success: boolean;
  message: string;
};

type ProfileUploadError = {
  success: boolean;
  message: string;
};

export const callProfileUpload = createAsyncThunk(
  'callProfileUpload',
  async (data: {filePath?: string; status?: string; currentPath?: string;}, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      if (data.filePath) {
        formData.append('profileImg', {
          uri: data.filePath,
          name: 'userProfile.png',
          type: 'image/png',
        });
      }

      if (data.status) {
        formData.append('status', data.status);
      }

      if(data.currentPath){
        formData.append('currentPath', data.currentPath);
      }

      const response = await post<ProfileUpload>(Endpoints.profileUpload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      console.log('err is :', err);
      const serializableError = {
        message: err.message,
        success: err.success,
      };
      return rejectWithValue(serializableError);
    }
  },
);

const initialState: {
  success: ProfileUpload | undefined;
  error: ProfileUploadError | undefined;
  loading: boolean;
} = {
  success: undefined,
  error: undefined,
  loading: false,
};

const profileUploadSlice = createSlice({
  name: 'ProfileUploadSlice',
  initialState,
  reducers: {
    resetProfileUploadResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callProfileUpload.pending, state => {
      state.loading = true;
    });
    builder.addCase(callProfileUpload.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callProfileUpload.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetProfileUploadResponse} = profileUploadSlice.actions;

export default profileUploadSlice.reducer;
