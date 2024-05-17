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
import {RenderLoginOptions} from '../../../Components/RenderLoginOptions';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Regex} from '../../../Functions/Regex';
import { useCheckUser } from './CustomHooks/useCheckUser';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: SignUpScreenStyles;
  colors: any;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {'Create Your'}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {'Account'}
    </Typography>
  </>
);

const SignUp = ({navigation}: Props): JSX.Element => {
  const {control, handleSubmit} = useForm();
  const {callCheckUserApi, resetCheckUserReducer, checkUserError} = useCheckUser(
    navigation,
    'Select Genres',
  );
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();

  const styles = getSignUpScreenStyles(colors);

  const handleSignUp = (data: {
    username: string;
    emailId: string;
    password: string;
  }) => {
    resetCheckUserReducer();
    callCheckUserApi(data)
  };

  const renderError = () => (
    <View>
      <Typography
        bgColor={colors.errorTextPrimary}
        size="medium"
        fontWeight="400"
        textStyle={styles.errorStyle}>
        {checkUserError?.message}
      </Typography>
    </View>
  );

  const renderGoogleLogin = () => (
    <View style={styles.googleLoginContainer}>
      <View style={styles.seperator} />
      <View style={styles.loginOptionsContainer}>
        <RenderLoginOptions colors={colors} />
      </View>
    </View>
  );

  const renderForm = () => (
    <>
      <TextInput
        name="username"
        secureTextEntry={false}
        control={control}
        label="Username"
        placeholder="Username"
        leftIcon="user"
        rules={{required: 'Username is reqired'}}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          name="emailId"
          secureTextEntry={false}
          control={control}
          label="Enter Your Email"
          placeholder="Enter Your Email"
          leftIcon="email"
          rules={{
            required: 'Email is reqired',
            pattern: {
              value: Regex.emailid,
              message: 'Invalid Email Enetered',
            },
          }}
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
          rules={{
            required: 'Password is reqired',
            pattern: {
              value: Regex.password,
              message:
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
            },
          }}
        />
      </View>
      {checkUserError && renderError()}
      <View style={styles.buttonContainer}>
        <CustomButton
          label="Register"
          radius={14}
          onPress={handleSubmit(handleSignUp)}
        />
      </View>
      <Typography
        bgColor={colors.loginOptionsTextColor}
        fontWeight="400"
        textStyle={styles.alreadyHaveAnAccount}>
        {'Already Have An Account?'}
        <Typography
          onPress={() => navigation.navigate('Login')}
          bgColor={colors.buttonTextColor}
          fontWeight="400"
          textStyle={styles.alreadyHaveAnAccount}>
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
