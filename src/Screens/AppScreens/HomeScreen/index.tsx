import {View, Text, Button} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import {increment, decrement, incrementAsync} from '../../../Redux/Slices/counterSlice';
import { Typography } from '../../../Components';

const HomeScreen = (): JSX.Element => {
	const count = useAppSelector((state) => state.counterSlice.value);
	const dispatch = useAppDispatch();

	const hardString = 'Hello Rajat'

	return (<View>
		<Typography accessibilityLabel='PROda' color='red' fontSize='large' style={{textAlign: 'center'}}>
			{hardString}
		</Typography>
		<Text>{count}</Text>
		<Button title="Increment" onPress={() => dispatch(increment())} />
		<Button title="Decrement" onPress={() => dispatch(decrement())} />
		<Button title="Increment Async" onPress={() => {
			dispatch(incrementAsync()); 
		}} />
	</View>);

};

export default HomeScreen;
