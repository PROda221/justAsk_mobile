import {combineReducers} from '@reduxjs/toolkit';
import homeSliderSlice from './Slices/HomeSliderSlice';
import homeStudentPortfoliosSlider from './Slices/HomeStudentPortfoliosSlider';
import onlineCoursesSlice from './Slices/OnlineCoursesSlice';
import campusCoursesSlice from './Slices/CampusCoursesSlice';
import level4CoursesSlice from './Slices/Level4CoursesSlice';
import loginSlice from './Slices/LoginSlice';
import aboutUsSlice from './Slices/AboutUsSlice';

const rootReducer = combineReducers({
	homeSliderSlice,
	homeStudentPortfoliosSlider,
	onlineCoursesSlice,
	campusCoursesSlice,
	level4CoursesSlice,
	aboutUsSlice,
	loginSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
