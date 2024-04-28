import {configureStore, type ThunkAction, type Action} from '@reduxjs/toolkit';
import rootReducer from './rootReducers';

const store = configureStore({
	reducer: rootReducer,
	// Add middleware or enhancers if needed
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type AppDispatch = typeof store.dispatch;

export default store;
