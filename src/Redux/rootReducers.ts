import {combineReducers} from '@reduxjs/toolkit';
import homeSliderSlice from './Slices/HomeSliderSlice';

const rootReducer = combineReducers({
	homeSliderSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
