import {ScrollView, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, TextInput, Typography} from '../../../Components';
import styled from 'styled-components';
import {type SignUpScreenStyles, getSignUpScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {type FieldValues, type SubmitHandler, useForm} from 'react-hook-form';
import {RenderLoginOptions} from '../../../Components/RenderLoginOptions';
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Regex} from '../../../Functions/Regex';
import {useCheckUser} from '../../../CustomHooks/AuthHooks/useCheckUser';
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';
import content from '../../../Assets/Languages/english.json';
import ErrorBox from '../../../Components/ErrorBox';

type FormDataType = {
  username: string;
  emailId: string;
  password: string;
};
type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: SignUpScreenStyles;
  colors: DarkColors;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.SignInScreen.title1}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.SignInScreen.title2}
    </Typography>
  </>
);

const SignUp = ({navigation}: Props): JSX.Element => {
  const {control, handleSubmit} = useForm();
  const {
    callCheckUserApi,
    resetCheckUserReducer,
    checkUserError,
    checkUserLoading,
  } = useCheckUser(navigation, 'Select Genres');
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();

  const styles = getSignUpScreenStyles(colors);

  const handleSignUp: SubmitHandler<FieldValues> = data => {
    callCheckUserApi(data as FormDataType);
  };

  const renderGoogleLogin = () => (
    <View style={styles.googleLoginContainer}>
      <View style={styles.seperator} />
      <View style={styles.loginOptionsContainer}>
        <RenderLoginOptions colors={colors} navigation={navigation} />
      </View>
    </View>
  );

  const renderForm = () => (
    <>
      <TextInput
        name="username"
        secureTextEntry={false}
        control={control}
        label={`${content.SignInScreen.username}`}
        placeholder={`${content.SignInScreen.username}`}
        leftIcon="user"
        rules={{required: content.SignInScreen.usernameMissing}}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          name="emailId"
          secureTextEntry={false}
          control={control}
          label={content.SignInScreen.email}
          placeholder={content.SignInScreen.email}
          leftIcon="email"
          rules={{
            required: content.SignInScreen.emailMissing,
            pattern: {
              value: Regex.emailid,
              message: `${content.SignInScreen.invalidEmail}`,
            },
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          name="password"
          secureTextEntry={true}
          control={control}
          label={content.SignInScreen.password}
          placeholder={content.SignInScreen.password}
          leftIcon="lock"
          rules={{
            required: content.SignInScreen.passwordMissing,
            pattern: {
              value: Regex.password,
              message: `${content.SignInScreen.passwordRequirement}`,
            },
          }}
        />
      </View>
      {checkUserError && (
        <ErrorBox
          title={`${content.SignInScreen.errorBoxTitle}`}
          message={checkUserError.message}
        />
      )}
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={checkUserLoading}
          label="Register"
          radius={14}
          onPress={handleSubmit(handleSignUp)}
        />
      </View>
      <View style={styles.alreadyHaveAnAccountContainer}>
        <Typography
          bgColor={colors.loginOptionsTextColor}
          fontWeight="400"
          textStyle={styles.alreadyHaveAnAccount}>
          {content.SignInScreen.alreadyAccount}
        </Typography>
        <Typography
          onPress={() => navigation.navigate('Login')}
          bgColor={colors.buttonTextColor}
          fontWeight="400"
          textStyle={styles.alreadyHaveAnAccount}>
          {content.SignInScreen.signIn}
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
          <Header onPress={resetCheckUserReducer} />
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
