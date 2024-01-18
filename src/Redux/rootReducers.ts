import {combineReducers} from '@reduxjs/toolkit';
// Import your reducers here
// import exampleReducer from './exampleReducer';
import counterSlice from './Slices/counterSlice';

const rootReducer = combineReducers({
	counterSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
