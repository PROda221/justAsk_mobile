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
};

export const getLandingScreenStyles = (colors): LandingScreenStyles =>
  StyleSheet.create<LandingScreenStyles>({
    loginSignUpContainer: {
      paddingTop: verticalScale(63),
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
  });
