import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, TextInput, Typography} from '../../../Components';
import styled from 'styled-components';
import {type ForgotPassScreenStyles, getForgotPassScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {type FieldValues, type SubmitHandler, useForm} from 'react-hook-form';
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Regex} from '../../../Functions/Regex';
import {useSendOtp} from '../../../CustomHooks/AuthHooks/useSendOtp';
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';
import content from '../../../Assets/Languages/english.json';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: ForgotPassScreenStyles;
  colors: DarkColors;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.ForgotPasswordScreen.title1}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.subTitle}>
      {content.ForgotPasswordScreen.title2}
    </Typography>
  </>
);

const ForgotPassword = ({navigation}: Props): JSX.Element => {
  const [email, setEmail] = useState('');
  const {control, handleSubmit} = useForm();

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();
  const {callSendOtpApi, resetSendOtpReducer, sendOtpError} = useSendOtp(
    navigation,
    'Otp Screen',
    email,
  );

  const styles = getForgotPassScreenStyles(colors);

  const handleNextButton: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setEmail(data.emailId as string);
    resetSendOtpReducer();
    callSendOtpApi(data as {emailId: string});
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
        placeholder={`${content.ForgotPasswordScreen.enterEmail}`}
        leftIcon="email"
        rules={{
          required: content.ForgotPasswordScreen.emailMissing,
          pattern: {
            value: Regex.emailid,
            message: `${content.ForgotPasswordScreen.invalidEmail}`,
          },
        }}
      />
      {sendOtpError && renderError()}
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={handleSubmit(handleNextButton)}
          label={`${content.ForgotPasswordScreen.nextButton}`}
          radius={14}
        />
      </View>
      <View style={styles.alreadyHaveAnAccountContainer}>
        <Typography
          bgColor={colors.loginOptionsTextColor}
          fontWeight="400"
          textStyle={styles.alreadyHaveAnAccount}>
          {content.ForgotPasswordScreen.createNewAccount}
        </Typography>
        <Typography
          onPress={() => navigation.navigate('Sign Up')}
          bgColor={colors.buttonTextColor}
          fontWeight="400"
          textStyle={styles.alreadyHaveAnAccount}>
          {content.ForgotPasswordScreen.signUp}
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
