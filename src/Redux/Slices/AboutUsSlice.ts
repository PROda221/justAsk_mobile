/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig'
type AboutUsTypes = {
  status: string;
  code: number;
  message: string;
  document: {
    id:string
    total_count: number;
    slug:string;
    pageheading:string;
    content:string;
    alt:string;
    image:string;
    meta_title:string;
    meta_keywords:string;
    meta_description:string;
  };
};

export const callAboutUs = createAsyncThunk(
  'callAboutUs',
  async (id:number, {rejectWithValue}) => {
    try {
      const response = await get<AboutUsTypes>(`/pages/read_one.php?id=${id}`);
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
  success: AboutUsTypes | undefined;
  error: unknown;
  loading: boolean;
} = {
  success: undefined,
  error: null,
  loading: false,
};

const aboutUsSlice = createSlice({
  name: 'aboutUsSlice',
  initialState,
  reducers: {
    resetSliderResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(callAboutUs.pending, state => {
      state.loading = true;
    });
    builder.addCase(callAboutUs.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callAboutUs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {resetSliderResponse} = aboutUsSlice.actions;

export default aboutUsSlice.reducer;
