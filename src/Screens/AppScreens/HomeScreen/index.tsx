import {View, Text, Button} from 'react-native';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import content from '../../../Assets/Languages/english.json';
import {Typography} from '../../../Components';
import {CustomButton} from '../../../Components/CustomButton';
import {CustomCard} from '../../../Components/CustomCard';
import {
  decrement,
  increment,
  incrementAsync,
} from '../../../Redux/Slices/counterSlice';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';

const HomeScreen = (): JSX.Element => {
  const {control, handleSubmit} = useForm<FormData>();

  const count = useAppSelector(state => state.counterSlice.value);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = data => {
    // eslint-disable-next-line no-console, no-restricted-syntax
    console.log('data is :', data);
  };

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
        label={homeScreenContent.password}
        secureTextEntry={true}
        rules={{required: 'Password required'}}
      />
      <Typography bgColor="black" type="displaySmall" size="large">
        {count}
      </Typography>
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

const styles = StyleSheet.create({
  buttonsView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  container: {alignItems: 'center', display: 'flex', justifyContent: 'center'},
});
