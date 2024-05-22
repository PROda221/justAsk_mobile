import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';

type SearchUser = {
  success: string;
  message: string;
  limit: number;
  lastId: string;
};

type SearchUserError = {
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
      return rejectWithValue(err);
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
      state.success = action.payload;
    });
    builder.addCase(callSearchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {resetSearchUserResponse, setSearchedGenre} =
  searchUserSlice.actions;

export default searchUserSlice.reducer;
