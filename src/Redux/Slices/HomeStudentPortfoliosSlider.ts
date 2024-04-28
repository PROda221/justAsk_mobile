/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig'
type SliderStudentPortfoliosResponse = {
  status: string;
  code: number;
  message: string;
  document: {
    total_count: number;
    records: Array<{
      image: string;
    }>;
  };
};

export const callHomeStudentPortfoliosSlider = createAsyncThunk(
  'callHomeStudentPortfoliosSlider',
  async (data, {rejectWithValue}) => {
    try {
      const response = await get<SliderStudentPortfoliosResponse>('/home/portfolio.php');
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
  success: SliderStudentPortfoliosResponse | undefined;
  error: unknown;
  loading: boolean;
} = {
  success: undefined,
  error: null,
  loading: false,
};

const homeStudentPortfoliosSlider = createSlice({
  name: 'homeStudentPortfoliosSlider',
  initialState,
  reducers: {
    resetSliderResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(callHomeStudentPortfoliosSlider.pending, state => {
      state.loading = true;
    });
    builder.addCase(callHomeStudentPortfoliosSlider.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callHomeStudentPortfoliosSlider.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {resetSliderResponse} = homeStudentPortfoliosSlider.actions;

export default homeStudentPortfoliosSlider.reducer;
