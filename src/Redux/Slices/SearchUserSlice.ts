import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';

type SearchUser = {
  success: string;
  data: Array<{
    username: string;
    adviceGenre: string[];
    status: string;
    profilePic: string;
  }>;
  limit: number;
  lastId: string;
};

type SearchUserError = {
  code: number;
  success: string;
  message: number;
};

export const callSearchUser = createAsyncThunk(
  'callSearchUser',
  async (
    data: {
      username: string;
      genreName: string[];
      limit: number;
      lastId: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await post<SearchUser>(Endpoints.search, data);
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
  success: SearchUser | undefined;
  error: SearchUserError | undefined;
  searchedGenres: string[];
  loading: boolean;
} = {
  searchedGenres: [],
  success: undefined,
  error: undefined,
  loading: false,
};

const searchUserSlice = createSlice({
  name: 'searchUserSlice',
  initialState,
  reducers: {
    setSearchedGenre(state, action) {
      state.searchedGenres = action.payload;
    },
    resetSearchUserResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callSearchUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(callSearchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = {...state.success, ...action.payload};
    });
    builder.addCase(callSearchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = undefined;
    });
  },
});

export const {resetSearchUserResponse, setSearchedGenre} =
  searchUserSlice.actions;

export default searchUserSlice.reducer;