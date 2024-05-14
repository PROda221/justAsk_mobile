import {ScrollView, View} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, Typography} from '../../../Components';
import styled from 'styled-components';
import {OtpScreenStyles, getOtpScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import OTPTextView from 'react-native-otp-textinput';
import { useVerifyOtp } from './CustomHooks/useVerifyOtp';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: OtpScreenStyles;
  colors: any;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {'Verify Email'}
    </Typography>
    <Typography
      bgColor={colors.loginOptionsTextColor}
      fontWeight="400"
      textStyle={styles.subTitle}>
      {'We Have Sent Code To Your Email Address'}
    </Typography>
  </>
);

const OtpScreen = ({navigation}: Props): JSX.Element => {
  const otpInput = useRef<OTPTextView>(null);

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();
  const {resetVerifyOtpReducer, callVerifyOtpApi, verifyOtpError} = useVerifyOtp()

  const styles = getOtpScreenStyles(colors);

  const getText = (value) => {
    console.log('value is :', value)
  };

  const handleVerifyOtp = () => {
    navigation.navigate('Reset Password');
  }

  const renderOtp = () => (
    <View style={styles.otpContainer}>
      <RenderTitle styles={styles} colors={colors} />
      <View style={styles.emailTextContainer}>
        <Typography
          bgColor={colors.loginOptionsTextColor}
          fontWeight="400"
          textStyle={styles.emailTextStyle}>
          {'Joseph---Mail.Com'}
        </Typography>
      </View>
      <View style={styles.enterOtpContainer}>

      <OTPTextView
        textInputStyle={styles.otpTextInputStyle}
        ref={otpInput}
        handleTextChange={getText}
        tintColor={colors.otpPrimaryColor}
        offTintColor={colors.otpSecondaryColor}
      />
      </View>
      <View style={styles.verifyButtonContainer}>
      <CustomButton onPress={handleVerifyOtp} label="Verify" radius={14} />
      </View>
      <View style={styles.sendAgainButtonContainer}>
        <CustomButton label="Send Again" radius={14} />
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          style={styles.mainContainer}>
          <Header />
          <Scroll>
            <View style={styles.otpView}>{renderOtp()}</View>
          </Scroll>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OtpScreen;
