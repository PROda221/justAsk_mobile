import {ScrollView, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, TextInput, Typography} from '../../../Components';
import styled from 'styled-components';
import {ForgotPassScreenStyles, getForgotPassScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useForm} from 'react-hook-form';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Regex} from '../../../Functions/Regex';
import {useSendOtp} from './CustomHooks/useSendOtp';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: ForgotPassScreenStyles;
  colors: any;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {'Forget Password'}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.subTitle}>
      {'We will use email address to reset your password'}
    </Typography>
  </>
);

const ForgotPassword = ({navigation}: Props): JSX.Element => {
  const {control, handleSubmit} = useForm();

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();
  const {callSendOtpApi, resetLoginReducer, sendOtpError} = useSendOtp(
    navigation,
    'Otp Screen',
  );

  const styles = getForgotPassScreenStyles(colors);

  const handleNextButton = (data: {emailId: string}) => {
    resetLoginReducer();
    callSendOtpApi(data);
  };

  const renderError = () => (
    <View>
      <Typography
        bgColor={colors.errorTextPrimary}
        size="medium"
        fontWeight="400"
        textStyle={styles.errorStyle}>
        {sendOtpError?.message}
      </Typography>
    </View>
  );

  const renderForm = () => (
    <>
      <TextInput
        name="emailId"
        secureTextEntry={false}
        control={control}
        label="Email Address"
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
      {sendOtpError && renderError()}
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={handleSubmit(handleNextButton)}
          label="Next"
          radius={14}
        />
      </View>
      <Typography
        bgColor={colors.loginOptionsTextColor}
        fontWeight="400"
        textStyle={styles.alreadyHaveAnAccount}>
        {'Create New Account?'}
        <Typography
          onPress={() => navigation.navigate('Sign Up')}
          bgColor={colors.buttonTextColor}
          fontWeight="400"
          textStyle={styles.alreadyHaveAnAccount}>
          {' Sign Up'}
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
          </Scroll>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;
