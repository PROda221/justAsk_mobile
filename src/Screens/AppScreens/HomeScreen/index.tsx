import {View, Text, Button} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import {increment, decrement, incrementAsync} from '../../../Redux/Slices/counterSlice';
import { Typography } from '../../../Components';
import content from '../../../Assets/Languages/english.json'

const HomeScreen = (): JSX.Element => {
	const count = useAppSelector((state) => state.counterSlice.value);
	const dispatch = useAppDispatch();

	return (<View>
		<Typography bgColor='blue' type='displayLarge' size='large'>
			{content.homeScreen.helloRajat}
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
