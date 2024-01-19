import {View, Text, Button} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import {
  increment,
  decrement,
  incrementAsync,
} from '../../../Redux/Slices/counterSlice';
import {TextInput, Typography} from '../../../Components';
import content from '../../../Assets/Languages/english.json';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type HomeScreenType } from '../../../Assets/Languages/englishTypes';

type FormData = {
	username: string;
	password: string;
  }


const homeScreenContent: HomeScreenType = content.homeScreen

const HomeScreen = (): JSX.Element => {
  const {
    control,
    handleSubmit,
  } = useForm<FormData>()

  const count = useAppSelector(state => state.counterSlice.value);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
	// eslint-disable-next-line no-console, no-restricted-syntax
	console.log('data is :', data)
  }
 
  return (
    <View>
      <Typography bgColor="blue" type="displayLarge" size="large">
        {homeScreenContent.helloNishant}
      </Typography>
      <TextInput
	    control={control}
		name={'username'}
        label={homeScreenContent.username}
		secureTextEntry={false}
		rules={{required: 'Username required'}}
      />
	  <TextInput
	    control={control}
		name={'password'}
        label={homeScreenContent.password }
		secureTextEntry={true}
		rules={{required: 'Password required'}}
      />
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button
        title="Increment Async"
        onPress={() => {
          dispatch(incrementAsync());
        }}
      />
	  <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default HomeScreen;
