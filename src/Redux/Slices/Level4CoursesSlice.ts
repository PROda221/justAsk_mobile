/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig'
export type Level4CoursesTypes = {
  status: string;
  code: number;
  message: string;
  document: {
    total_count: number;
    records: Array<{
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
      coursefee:string;
      tabs: {
        "Qualification Overview":string;
        "Units Covered":string
        "Recognition":string
        "Entry Requirements":string
      };
    }>;
  };
};



type Level4CoursesByIdTypes = {
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
          Modules_Covered:string;
          Reviews:Array<{
              point:string
          }>;
  
        };
        coursefees: {
          fees: string;
          offerfees: string
          currency_symbol: string,
          currency: string
      }
       
    };
  };

export const callLevel4Courses = createAsyncThunk(
  'callLevel4Courses',
  async (data, {rejectWithValue}) => {
    try {
      const response = await get<Level4CoursesTypes>('/level4courses/read.php');
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const callLevel4CoursesById = createAsyncThunk(
    'callLevel4CoursesById',
    async (id:number, {rejectWithValue}) => {
      try {
        const response = await get<Level4CoursesByIdTypes>(`/onlinecourses/read_one.php?id=${id}&countrycode=IN`);
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
  success: Level4CoursesTypes | undefined;
  error: unknown;
  loading: boolean;
  successById: Level4CoursesByIdTypes | undefined;
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

const level4Courses = createSlice({
  name: 'level4Courses',
  initialState,

  reducers: {
    resetSliderResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(callLevel4Courses.pending, state => {
      state.loading = true;
    });
    builder.addCase(callLevel4Courses.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callLevel4Courses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(callLevel4CoursesById.pending, state => {
      state.loadingById = true;
    });
    builder.addCase(callLevel4CoursesById.fulfilled, (state, action) => {
      state.loadingById = false;
      state.successById = action.payload;
    });
    builder.addCase(callLevel4CoursesById.rejected, (state, action) => {
      state.loadingById = false;
      state.errorById = action.error;
    });
  },
});

export const {resetSliderResponse} = level4Courses.actions;

export default level4Courses.reducer;
