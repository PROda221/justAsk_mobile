import {ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, TextInput, Typography} from '../../../Components';
import styled from 'styled-components';
import {LogInScreenStyles, getLogInScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useForm} from 'react-hook-form';
import {RenderLoginOptions} from '../../../Components/RenderLoginOptions';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useLogin} from '../../../CustomHooks/AuthHooks/useLogin';
import content from '../../../Assets/Languages/english.json';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: LogInScreenStyles;
  colors: any;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.LoginScreen.loginTitle1}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.LoginScreen.loginTitle2}
    </Typography>
  </>
);

const LogIn = ({navigation}: Props): JSX.Element => {
  const {control, handleSubmit} = useForm();
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();
  const {callLoginApi, resetLoginReducer, loginLoading} = useLogin();

  const styles = getLogInScreenStyles(colors);

  const handleLogin = (data: {username: string; password: string}) => {
    resetLoginReducer();
    callLoginApi(data);
  };

  const renderGoogleLogin = () => (
    <View style={styles.googleLoginContainer}>
      <View style={styles.seperator} />
      <View style={styles.loginOptionsContainer}>
        <RenderLoginOptions colors={colors} />
      </View>
    </View>
  );

  const handleForgotScreen = () => {
    navigation.navigate('Forgot Password');
  };

  const renderForm = () => (
    <>
      <TextInput
        name="username"
        secureTextEntry={false}
        control={control}
        label="Username"
        placeholder="Username"
        leftIcon="user"
        rules={{required: content.LoginScreen.usernameMissing}}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          name="password"
          secureTextEntry={true}
          control={control}
          label="Password"
          placeholder="Password"
          leftIcon="lock"
          rules={{required: content.LoginScreen.passwordMissing}}
        />
      </View>
      <TouchableOpacity onPress={handleForgotScreen}>
        <Typography
          bgColor={colors.buttonTextColor}
          fontWeight="400"
          textStyle={styles.forgotPassText}>
          {content.LoginScreen.forgotPassword}
        </Typography>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={loginLoading}
          label="Login"
          radius={14}
          onPress={handleSubmit(handleLogin)}
        />
      </View>
      <View style={styles.newAccountTextContainer}>
        <Typography
          bgColor={colors.loginOptionsTextColor}
          fontWeight="400"
          textStyle={styles.alreadyHaveAnAccount}>
          {content.LoginScreen.createNewAccount}
        </Typography>
        <Typography
          bgColor={colors.buttonTextColor}
          fontWeight="400"
          onPress={() => navigation.navigate('Sign Up')}
          textStyle={styles.alreadyHaveAnAccount}>
          {content.LoginScreen.signUp}
        </Typography>
      </View>
    </>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          style={styles.mainContainer}>
          <Header onPress={resetLoginReducer} />
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

export default LogIn;
