import {ScrollView, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, TextInput, Typography} from '../../../Components';
import styled from 'styled-components';
import {SignUpScreenStyles, getSignUpScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useForm} from 'react-hook-form';
import { RenderLoginOptions } from '../../../Components/RenderLoginOptions';


const RenderTitle = ({
  styles,
  colors,
}: {
  styles: SignUpScreenStyles;
  colors: any;
}) => (
  <Typography
    bgColor={colors.textPrimaryColor}
    fontWeight="400"
    textStyle={styles.title}>
    {'Create your Account'}
  </Typography>
);

const SignUp = (): JSX.Element => {
  const {control, handleSubmit} = useForm();
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();

  const styles = getSignUpScreenStyles(colors);

  const renderGoogleLogin = () => ( <View style={styles.googleLoginContainer}>
      <View style={styles.seperator} />
      <View style={styles.loginOptionsContainer}>
      <RenderLoginOptions colors={colors} />
      </View>
      </View>)

  const renderForm = () => (
    <>
      <TextInput
        name="username"
        secureTextEntry={false}
        control={control}
        label="Username"
        placeholder="Username"
        leftIcon="user"
      />
      <View style={styles.textInputContainer}>
        <TextInput
          name="email"
          secureTextEntry={false}
          control={control}
          label="Email"
          placeholder="Enter Your Email"
          leftIcon="email"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          name="password"
          secureTextEntry={true}
          control={control}
          label="Password"
          placeholder="Password"
          leftIcon="lock"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton label="Register" radius={14} />
      </View>
      <Typography bgColor={colors.loginOptionsTextColor} fontWeight="400" textStyle={styles.alreadyHaveAnAccount}>
        {'Already Have An Account?'}
        <Typography bgColor={colors.buttonTextColor} fontWeight="400" textStyle={styles.alreadyHaveAnAccount}>
          {' Sign In'}
        </Typography>
      </Typography>
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
            {renderGoogleLogin()}
          </Scroll>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignUp;
