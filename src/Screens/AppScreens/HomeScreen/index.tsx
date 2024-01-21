import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import content from '../../../Assets/Languages/english.json';
import { Typography } from '../../../Components';
import { CustomButton } from '../../../Components/CustomButton';
import { CustomCard } from '../../../Components/CustomCard';
import { decrement, increment, incrementAsync } from '../../../Redux/Slices/counterSlice';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';

const HomeScreen = (): JSX.Element => {
  const count = useAppSelector((state) => state.counterSlice.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Typography bgColor="blue" type="displayLarge" size="large">
        {content.homeScreen.helloNishant}
      </Typography>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button
        title="Increment Async"
        onPress={() => {
          dispatch(incrementAsync());
        }}
      />
      {/* <Button title="Increment" onPress={() => dispatch(increment())} /> */}
      <CustomButton
        variant="tertiary"
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onPress={() => {}}
        label={`${content.homeScreen.hello}`}
      />
      <View style={styles.buttonsView}>
        <CustomButton
          variant="primary"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPress={() => {}}
          label={`${content.homeScreen.hello}`}
        />
        <CustomButton
          variant="secondary"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPress={() => {}}
          label={`${content.homeScreen.hello}`}
        />
      </View>

      <CustomCard
        title={`${content.homeScreen.firstcard}`}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onPress={() => {}}
        mode="elevated"
        imageSource={{ uri: 'https://picsum.photos/700' }}
      />
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
  container: { alignItems: 'center', display: 'flex', justifyContent: 'center' },
});
