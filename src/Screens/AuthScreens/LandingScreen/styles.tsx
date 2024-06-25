import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
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
  textInput: ViewStyle | TextStyle;
  signUpStyle: ViewStyle;
  loginSignInButton: ViewStyle;
  loginSigninFontStyle: TextStyle;
  loginOptionsContainer: ViewStyle;
  headingText: TextStyle;
  headerTextContainer: ViewStyle;
};

export const getLandingScreenStyles = (colors): LandingScreenStyles =>
  StyleSheet.create<LandingScreenStyles>({
    loginOptionsContainer: {
      alignItems: 'center',
      paddingTop: verticalScale(48),
    },
    loginSignInButton: {
      backgroundColor: colors.textInputBackgroundColor,
      borderRadius: moderateScale(95),
      height: verticalScale(63.36),
      width: '100%',
    },
    loginSignUpContainer: {
      paddingTop: verticalScale(63),
    },
    loginSigninFontStyle: {
      fontSize: moderateScale(18),
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
    },
    headingText: {
      fontSize: moderateScale(40),
      textAlign: 'center',
      alignSelf: 'center',
    },
    headerTextContainer: {alignItems: 'center'},
  });
