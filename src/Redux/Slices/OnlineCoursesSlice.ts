/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig';

export type Record = {
    id: number;
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
    coursetitle: string;
    slug: string;
    courseheading: string;
    coursesummary: string;
    coursecontent: string;
    coursehighlights: string;
    image: string;
    imagealt: string;
    courselength?: string;
    coursetype?: string;
    courselevel?: string;
    video?: string;
    tabs?: {
      "Qualification Overview"?: string;
      "Units Covered"?: string; 
      Recognition?: string;
      "Entry Requirements"?: string;
      'Modules Covered'?: string;
      Reviews?: Array<{
        point?: string;
      }>;
    };
    coursefees?: {
      fees: string;
      offerfees: string;
      currency_symbol: string;
      currency: string;
    };
};
export type OnlineCoursesType = {
  status: string;
  code: number;
  message: string;
  document: {
    total_count: number;
    records: Array<{
      coursefee: string;
      id: number;
      meta_title: string;
      meta_keywords: string;
      meta_description: string;
      coursetitle: string;
      slug: string;
      courseheading: string;
      coursesummary: string;
      coursecontent: string;
      coursehighlights: string;
      image: string;
      imagealt: string;
      courselength: string;
      coursetype: string;
      courselevel: string;
      video: string;
      tabs: {
        'Modules Covered': string;
        Reviews: Array<{
          point: string;
        }>;
      };
      coursefees: {
        fees: string;
        offerfees: string;
        currency_symbol: string;
        currency: string;
      };
    }>;
  };
};

type OnlineCoursesByIdType = {
  status: string;
  code: number;
  message: string;
  document: {
    id: number;
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
    coursetitle: string;
    slug: string;
    courseheading: string;
    coursesummary: string;
    coursecontent: string;
    coursehighlights: string;
    image: string;
    imagealt: string;
    courselength: string;
    coursetype: string;
    courselevel: string;
    video: string;
    tabs: {
      'Modules Covered': string;
      Reviews: Array<{
        point: string;
      }>;
    };
    coursefees: {
      fees: string;
      offerfees: string;
      currency_symbol: string;
      currency: string;
    };
  };
};

export const callGetOnlineCourses = createAsyncThunk(
  'callGetOnlineCourses',
  async (data, {rejectWithValue}) => {
    try {
      const response = await get<OnlineCoursesType>(
        '/onlinecourses/read.php?countrycode=IN',
      );
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const callGetOnlineCoursesById = createAsyncThunk(
  'callGetOnlineCoursesById',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await get<OnlineCoursesByIdType>(
        `/onlinecourses/read_one.php?id=${id}&countrycode=IN`,
      );
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
  success: OnlineCoursesType | undefined;
  error: unknown;
  loading: boolean;
  successById: OnlineCoursesByIdType | undefined;
  errorById: unknown;
  loadingById: boolean;
} = {
  success: undefined,
  error: null,
  loading: false,
  successById: undefined,
  errorById: null,
  loadingById: false,
};

const onlinecourses = createSlice({
  name: 'onlinecourses',
  initialState,

  reducers: {
    resetSliderResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = null;
    },
    resetSliderIdResponse(state) {
      state.loadingById = false;
      state.errorById = undefined;
      state.successById = undefined;
    },
  },

  extraReducers(builder) {
    builder.addCase(callGetOnlineCourses.pending, state => {
      state.loading = true;
    });
    builder.addCase(callGetOnlineCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callGetOnlineCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(callGetOnlineCoursesById.pending, state => {
      state.loadingById = true;
    });
    builder.addCase(callGetOnlineCoursesById.fulfilled, (state, action) => {
      state.loadingById = false;
      state.successById = action.payload;
    });
    builder.addCase(callGetOnlineCoursesById.rejected, (state, action) => {
      state.loadingById = false;
      state.errorById = action.error;
    });
  },
});

export const {resetSliderResponse, resetSliderIdResponse} =
  onlinecourses.actions;

export default onlinecourses.reducer;
