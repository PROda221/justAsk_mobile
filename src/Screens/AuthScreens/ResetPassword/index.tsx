import {ScrollView, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, TextInput, Typography} from '../../../Components';
import styled from 'styled-components';
import {ResetPassScreenStyles, getResetPassScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useForm} from 'react-hook-form';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: ResetPassScreenStyles;
  colors: any;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {'Reset Your'}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {'Password'}
    </Typography>
  </>
);

const ResetPassword = ({navigation}: Props): JSX.Element => {
  const {control, handleSubmit} = useForm();

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();

  const styles = getResetPassScreenStyles(colors);

  const handleNextButton = () => {
    navigation.navigate('Otp Screen');
  };

  const renderForm = () => (
    <>
      <TextInput
        name="password"
        secureTextEntry={true}
        control={control}
        label="Password"
        placeholder="Password"
        leftIcon="lock"
      />
      <View style={styles.textInputContainer}>
        <TextInput
          name="confirmPassword"
          secureTextEntry={true}
          control={control}
          label="Confirm Password"
          placeholder="Confirm Password"
          leftIcon="lock"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={handleNextButton} label="Reset" radius={14} />
      </View>
    </>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          style={styles.mainContainer}>
          <Header />
          <Scroll>
            <View style={styles.titleContainer}>
              <RenderTitle styles={styles} colors={colors} />
            </View>
            <View style={styles.formContainer}>{renderForm()}</View>
          </Scroll>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ResetPassword;
