/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig'
type SliderResponse = {
  status: string;
  code: number;
  message: string;
  document: {
    total_count: number;
    records: Array<{
      id: string;
      alt: string;
      image: string;
      caption: string;
    }>;
  };
};

export const callHomeSlider = createAsyncThunk(
  'callHomeSlider',
  async (data, {rejectWithValue}) => {
    try {
      const response = await get<SliderResponse>('/home/slider.php');
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
  success: SliderResponse | undefined;
  error: unknown;
  loading: boolean;
} = {
  success: undefined,
  error: null,
  loading: false,
};

const homeSliderSlice = createSlice({
  name: 'homeSliderSlice',
  initialState,
  reducers: {
    resetSliderResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(callHomeSlider.pending, state => {
      state.loading = true;
    });
    builder.addCase(callHomeSlider.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callHomeSlider.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {resetSliderResponse} = homeSliderSlice.actions;

export default homeSliderSlice.reducer;
