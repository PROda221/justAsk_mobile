/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {post} from '../../Api/AxiosConfig';
import {Endpoints} from '../../Api/Endpoints';

type YourCommentSuccess = {
  success: boolean;
  message: string;
  yourComment: {
    username: string;
    commentUserId: string;
    content: string;
    rating: number;
    updatedAt: string;
  };
};

type YourCommentError = {
  success: boolean;
  message: string;
};

type AddCommentSuccess = {
  success: boolean;
  message: string;
};

type AddCommentError = {
  success: boolean;
  message: string;
};

export type Comment = {
  username: string;
  content: string;
  commentUserId: string;
  rating: number;
};

type AverageRating = {
  _id: string;
  averageStars: number;
};

type AllCommentsSuccess = {
  success: boolean;
  limit: number;
  data: Array<Comment>;
  averageRating: Array<AverageRating>;
  lastId: string;
};

type AllCommentsError = {
  success: boolean;
  message: string;
};

export const callYourComment = createAsyncThunk(
  'callYourComment',
  async (data: {username: string}, {rejectWithValue}) => {
    try {
      const response = await post<YourCommentSuccess>(
        Endpoints.getYourComment,
        data,
      );
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      const serializableError = {
        message: err.message,
        success: err.success,
      };
      return rejectWithValue(serializableError);
    }
  },
);

export const callAddComment = createAsyncThunk(
  'callAddComment',
  async (
    data: {username: string; content: string; rating: number},
    {rejectWithValue},
  ) => {
    try {
      const response = await post<AddCommentSuccess>(
        Endpoints.addCommenet,
        data,
      );
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      const serializableError = {
        message: err.message,
        success: err.success,
      };
      return rejectWithValue(serializableError);
    }
  },
);

export const callAllComments = createAsyncThunk(
  'callAllComments',
  async (data: {username: string}, {rejectWithValue}) => {
    try {
      const response = await post<AllCommentsSuccess>(
        Endpoints.gtAllComments,
        data,
      );
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      const serializableError = {
        message: err.message,
        success: err.success,
      };
      return rejectWithValue(serializableError);
    }
  },
);

const initialState: {
  getYourComment: {
    success: YourCommentSuccess | undefined;
    loading: boolean;
    error: YourCommentError | undefined;
  };
  addCommenet: {
    success: AddCommentSuccess | undefined;
    loading: boolean;
    error: AddCommentError | undefined;
  };
  allComments: {
    success: AllCommentsSuccess | undefined;
    loading: boolean;
    error: AllCommentsError | undefined;
  };
} = {
  getYourComment: {
    success: undefined,
    loading: false,
    error: undefined,
  },
  addCommenet: {
    success: undefined,
    loading: false,
    error: undefined,
  },
  allComments: {
    success: undefined,
    loading: false,
    error: undefined,
  },
};

const feedbackSlice = createSlice({
  name: 'feedbackSlice',
  initialState,
  reducers: {
    resetYourCommentData(state) {
      state.getYourComment.success = undefined;
      state.getYourComment.loading = false;
      state.getYourComment.error = undefined;
    },
    resetAddCommenetData(state) {
      state.addCommenet.success = undefined;
      state.addCommenet.loading = false;
      state.addCommenet.error = undefined;
    },
    resetAllCommentsData(state) {
      state.allComments.success = undefined;
      state.allComments.loading = false;
      state.allComments.error = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callYourComment.pending, state => {
      state.getYourComment.loading = true;
    });
    builder.addCase(callYourComment.fulfilled, (state, action) => {
      state.getYourComment.loading = false;
      state.getYourComment.success = action.payload;
    });
    builder.addCase(callYourComment.rejected, (state, action) => {
      state.getYourComment.loading = false;
      state.getYourComment.error = action.payload;
    });

    builder.addCase(callAddComment.pending, state => {
      state.addCommenet.loading = true;
    });
    builder.addCase(callAddComment.fulfilled, (state, action) => {
      state.addCommenet.loading = false;
      state.addCommenet.success = action.payload;
    });
    builder.addCase(callAddComment.rejected, (state, action) => {
      state.addCommenet.loading = false;
      state.addCommenet.error = action.payload;
    });

    builder.addCase(callAllComments.pending, state => {
      state.allComments.loading = true;
    });
    builder.addCase(callAllComments.fulfilled, (state, action) => {
      state.allComments.loading = false;
      state.allComments.success = action.payload;
    });
    builder.addCase(callAllComments.rejected, (state, action) => {
      state.allComments.loading = false;
      state.allComments.error = action.payload;
    });
  },
});

export const {
  resetYourCommentData,
  resetAddCommenetData,
  resetAllCommentsData,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
