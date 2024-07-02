import {combineReducers} from '@reduxjs/toolkit';
import homeSliderSlice from './Slices/HomeSliderSlice';
import homeStudentPortfoliosSlider from './Slices/HomeStudentPortfoliosSlider';
import onlineCoursesSlice from './Slices/OnlineCoursesSlice';
import campusCoursesSlice from './Slices/CampusCoursesSlice';
import level4CoursesSlice from './Slices/Level4CoursesSlice';
import loginSlice from './Slices/LoginSlice';
import aboutUsSlice from './Slices/AboutUsSlice';
import signUpSlice from './Slices/SignUpSlice';
import sendOtpSlice from './Slices/SendOtpSlice';
import verifyOtpSlice from './Slices/VerifyOtpSlice';
import resetPassSlice from './Slices/ResetPassSlice';
import checkUserSlice from './Slices/CheckUserSlice';
import searchUserSlice from './Slices/SearchUserSlice';
import profileSlice from './Slices/ProfileSlice';
import notificationsSlice from './Slices/NotificationsSlice';
import userProfileSlice from './Slices/UserProfileSlice';
import feedbackSlice from './Slices/FeedbackSlice';
import isLoginSlice from './Slices/IsLogInSlice';
import profileUpload from './Slices/ProfileUpload';
import googleLoginSlice from './Slices/GoogleLoginSlice';

const rootReducer = combineReducers({
	homeSliderSlice,
	homeStudentPortfoliosSlider,
	onlineCoursesSlice,
	campusCoursesSlice,
	level4CoursesSlice,
	aboutUsSlice,
	loginSlice,
	signUpSlice,
	sendOtpSlice,
	verifyOtpSlice,
	resetPassSlice,
	checkUserSlice,
	searchUserSlice,
	profileSlice,
	notificationsSlice,
	userProfileSlice,
	feedbackSlice,
	isLoginSlice,
	profileUpload,
	googleLoginSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
