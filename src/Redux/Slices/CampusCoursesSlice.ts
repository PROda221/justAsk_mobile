/* eslint-disable @typescript-eslint/no-throw-literal */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../Api/AxiosConfig'
export type CampusCoursesTypes = {
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
        'Modules Covered':string;
        "Course Fees & Dates":string;
        "Entry Requirements":string
        };
    }>;
  };
};



type CampusCoursesByIdtypes = {
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


export const callCampusCourses = createAsyncThunk(
  'callCampusCourses',
  async (data, {rejectWithValue}) => {
    try {
      const response = await get<CampusCoursesTypes>('/campuscourses/read.php');
      if (response.status === 200) {
        return response.data;
      }

      throw response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const callCampusCoursesById = createAsyncThunk(
    'callCampusCoursesById',
    async (id:number, {rejectWithValue}) => {
      try {
        const response = await get<CampusCoursesByIdtypes>(`/onlinecourses/read_one.php?id=${id}&countrycode=IN`);
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
  success: CampusCoursesTypes | undefined;
  error: unknown;
  loading: boolean;
  successById: CampusCoursesByIdtypes | undefined;
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

const campusCourses = createSlice({
  name: 'campusCourses',
  initialState,
  reducers: {
    resetSliderResponse(state) {
      state.success = undefined;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(callCampusCourses.pending, state => {
      state.loading = true;
    });
    builder.addCase(callCampusCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(callCampusCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(callCampusCoursesById.pending, state => {
      state.loadingById = true;
    });
    builder.addCase(callCampusCoursesById.fulfilled, (state, action) => {
      state.loadingById = false;
      state.successById = action.payload;
    });
    builder.addCase(callCampusCoursesById.rejected, (state, action) => {
      state.loadingById = false;
      state.errorById = action.error;
    });
  },
});

export const {resetSliderResponse} = campusCourses.actions;

export default campusCourses.reducer;
