import {combineReducers} from '@reduxjs/toolkit';
import homeSliderSlice from './Slices/HomeSliderSlice';
import homeStudentPortfoliosSlider from './Slices/HomeStudentPortfoliosSlider';
import onlineCoursesSlice from './Slices/OnlineCoursesSlice';
import campusCoursesSlice from './Slices/CampusCoursesSlice';
import level4CoursesSlice from './Slices/Level4CoursesSlice';

const rootReducer = combineReducers({
	homeSliderSlice,
	homeStudentPortfoliosSlider,
	onlineCoursesSlice,
	campusCoursesSlice,
	level4CoursesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
