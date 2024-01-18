import {createSlice} from '@reduxjs/toolkit';
import {type AppThunk} from '../store';

type CounterSlice = {
	value: number;
};

const initialState: CounterSlice = {
	value: 0,
};

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment(state) {
			state.value += 1;
		},
		decrement(state) {
			state.value -= 1;
		},
	},
});

export const {increment, decrement} = counterSlice.actions;

export const incrementAsync = (): AppThunk => (dispatch) => {
	setTimeout(() => {
		dispatch(increment());
	}, 1000);
};

export default counterSlice.reducer;
