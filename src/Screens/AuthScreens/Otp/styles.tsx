import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type OtpScreenStyles = {
  title: TextStyle;
  subTitle: TextStyle;
  safeAreaContainer: ViewStyle;
  titleContainer: ViewStyle;
  mainContainer: ViewStyle;
  textInputContainer: ViewStyle;
  formContainer: ViewStyle;
  buttonContainer: ViewStyle;
  alreadyHaveAnAccount: TextStyle;
  seperator: ViewStyle;
  googleLoginContainer: ViewStyle;
  loginOptionsContainer: ViewStyle;
  forgotPassText: TextStyle;
  otpContainer: ViewStyle;
  otpView: ViewStyle;
  emailTextContainer: ViewStyle;
  emailTextStyle: TextStyle;
  sendAgainButtonContainer: ViewStyle;
  otpTextInputStyle: ViewStyle | TextStyle;
  enterOtpContainer: ViewStyle;
  verifyButtonContainer: ViewStyle;
  errorStyle: TextStyle;
  
};

export const getOtpScreenStyles = (colors): OtpScreenStyles =>
  StyleSheet.create<OtpScreenStyles>({
    alreadyHaveAnAccount: {
      fontSize: moderateScale(16),
      paddingTop: verticalScale(14),
    },
    buttonContainer: {
      paddingTop: verticalScale(18),
    },
    emailTextContainer: {
       paddingTop: verticalScale(30)
    },
    emailTextStyle: {
      fontFamily: 'Urbanist-SemiBold',
      fontSize: moderateScale(15)
    },
    enterOtpContainer: {
      paddingTop: verticalScale(29)
    },
    errorStyle: {
      fontFamily: 'Urbanist-SemiBold',
    },
    forgotPassText: {
      color: colors.loginOptionsTextColor,
      fontSize: moderateScale(14),
      paddingTop: verticalScale(14),
      textAlign: 'right',
    },
    formContainer: {
      paddingTop: verticalScale(70),
    },
    googleLoginContainer: {
      paddingTop: verticalScale(35),
    },
    loginOptionsContainer: {
      paddingTop: verticalScale(23),
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: horizontalScale(18),
    },
    otpContainer: {
      paddingHorizontal: horizontalScale(18),
      paddingTop: verticalScale(40)
    },
    otpTextInputStyle: {
      borderBottomWidth: moderateScale(2),
      borderRadius: moderateScale(13),
      borderWidth: moderateScale(2),
      color: colors.textPrimaryColor,
      fontFamily: 'Urbanist-Regular',
      fontSize: moderateScale(30),
      height: verticalScale(60),
      width: horizontalScale(60)
    },
    otpView: {
      backgroundColor: colors.primaryBackgroundColor,
      borderRadius: moderateScale(20),
      height: verticalScale(502),
      marginTop: verticalScale(40),
    },
    safeAreaContainer: {
      backgroundColor: colors.secondaryBackgroundColor,
      flex: 1,
    },
    sendAgainButtonContainer: {
      paddingTop: verticalScale(12)
    },
    seperator: {
      borderBottomColor: colors.seperatorColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    subTitle: {
      fontFamily: 'Urbanist-Regular',
      fontSize: moderateScale(14),
      paddingTop: verticalScale(11),
      textAlign: 'center',
    },
    textInputContainer: {paddingTop: verticalScale(18)},
    title: {
      fontFamily: 'Urbanist-SemiBold',
      fontSize: moderateScale(22),
      textAlign: 'center',
    },
    titleContainer: {
      paddingTop: verticalScale(74),
    },
    verifyButtonContainer: {
      paddingTop: verticalScale(45)
    }
  });
