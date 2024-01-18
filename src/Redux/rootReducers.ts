import {combineReducers} from '@reduxjs/toolkit';
import counterSlice from './Slices/counterSlice';

const rootReducer = combineReducers({
	counterSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
