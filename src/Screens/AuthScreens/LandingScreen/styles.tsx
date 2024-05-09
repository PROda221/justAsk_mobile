import {StyleSheet, ViewStyle} from 'react-native';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type LandingScreenStyles = {
  safeAreaContainer: ViewStyle;
  mainContainer: ViewStyle;
  logoView: ViewStyle;
  loginSignUpContainer: ViewStyle;
  textInput: ViewStyle;
  signUpStyle: ViewStyle;
  loginOptionsContainer: ViewStyle;
  googleLoginButton: ViewStyle;
  googleLoginButtonContainer: ViewStyle;
  loginSignInButton: ViewStyle;
  loginSigninFontStyle: ViewStyle;
};

export const getLandingScreenStyles = (colors): LandingScreenStyles =>
  StyleSheet.create<LandingScreenStyles>({
    googleLoginButton: {
      backgroundColor: colors.googleButtonColor,
      height: verticalScale(57),
      width: horizontalScale(165)
    },
    googleLoginButtonContainer: {
      alignItems: 'center',
      paddingTop: verticalScale(23)
    },
    loginOptionsContainer: {
      paddingTop: verticalScale(42)
    },
    loginSignInButton : {
      backgroundColor: colors.textInputBackgroundColor,
      borderRadius: moderateScale(95),
      height: verticalScale(63.36),
      width: '100%',
    },
    loginSignUpContainer: {
      paddingTop: verticalScale(63),
    },
    loginSigninFontStyle: {
      fontSize: moderateScale(18)
    },
    logoView: {
      alignSelf: 'center',
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: horizontalScale(18),
    },
    safeAreaContainer: {
      backgroundColor: colors.primaryBackgroundColor,
      flex: 1,
    },
    signUpStyle: {
      paddingTop: verticalScale(23),
    },
    textInput: {
      backgroundColor: colors.textInputBackgroundColor,
      borderRadius: moderateScale(95),
      fontFamily: 'Urbanist-SemiBold',
      fontSize: moderateScale(18),
      height: verticalScale(63.36),
      textAlign: 'center',
      width: '100%',
    }
  });
