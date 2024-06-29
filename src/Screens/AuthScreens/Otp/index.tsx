import {ScrollView, View} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, Typography} from '../../../Components';
import styled from 'styled-components';
import {type OtpScreenStyles, getOtpScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {type ParamListBase, type RouteProp} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import OTPTextView from 'react-native-otp-textinput';
import {useVerifyOtp} from '../../../CustomHooks/AuthHooks/useVerifyOtp';
import {useSendOtp} from '../../../CustomHooks/AuthHooks/useSendOtp';
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';
import content from '../../../Assets/Languages/english.json';
import Toast from 'react-native-toast-message';

type Params = {
  params: {
    emailId: string;
  };
};
type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<Params>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: OtpScreenStyles;
  colors: DarkColors;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.OtpScreen.title}
    </Typography>
    <Typography
      bgColor={colors.loginOptionsTextColor}
      fontWeight="400"
      textStyle={styles.subTitle}>
      {content.OtpScreen.subTitle}
    </Typography>
  </>
);

let otpValue: string[] | undefined = [];

const OtpScreen = ({navigation, route}: Props): JSX.Element => {
  const otpInput = useRef<OTPTextView>(null);

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();
  const {resetVerifyOtpReducer, callVerifyOtpApi, verifyOtpLoading} =
    useVerifyOtp(navigation, 'Reset Password', route.params?.emailId);

  const {callSendOtpApi, resetSendOtpReducer, sendOtpLoading} = useSendOtp();

  const styles = getOtpScreenStyles(colors);

  const getText = (value: string) => {
    otpValue = otpInput.current?.getOTPTextChucks(value.length, 1, value);
  };

  const handleSendOtp = () => {
    resetVerifyOtpReducer();
    callSendOtpApi({emailId: route.params?.emailId});
  };

  const handleVerifyOtp = () => {
    if (otpValue?.length === 4) {
      resetVerifyOtpReducer();
      callVerifyOtpApi({
        emailId: route.params?.emailId,
        otp: otpValue.join(''),
      });
    } else {
      Toast.show({
        type: 'info',
        text1: `${content.OtpScreen.invalidOtp}`,
        text2: `${content.OtpScreen.invalidOtpLength}`,
        visibilityTime: 3000,
      });
    }
  };

  const renderOtp = () => (
    <View style={styles.otpContainer}>
      <RenderTitle styles={styles} colors={colors} />
      <View style={styles.emailTextContainer}>
        <Typography
          bgColor={colors.loginOptionsTextColor}
          fontWeight="400"
          textStyle={styles.emailTextStyle}>
          {route.params?.emailId}
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
        <CustomButton
          loading={verifyOtpLoading}
          onPress={handleVerifyOtp}
          label="Verify"
          radius={14}
        />
      </View>
      <View style={styles.sendAgainButtonContainer}>
        <CustomButton
          loading={sendOtpLoading}
          label="Send Again"
          radius={14}
          onPress={handleSendOtp}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          style={styles.mainContainer}>
          <Header onPress={resetSendOtpReducer} />
          <Scroll>
            <View style={styles.otpView}>{renderOtp()}</View>
          </Scroll>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OtpScreen;
