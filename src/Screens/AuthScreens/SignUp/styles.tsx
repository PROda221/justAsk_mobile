import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../../../Functions/StyleScale';

export type SignUpScreenStyles = {
  title: TextStyle;
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
};

export const getSignUpScreenStyles = (colors): SignUpScreenStyles =>
  StyleSheet.create<SignUpScreenStyles>({
    alreadyHaveAnAccount: {
      fontSize: moderateScale(16),
      paddingTop: verticalScale(14)
    },
    buttonContainer: {
      paddingTop: verticalScale(18)
    },
    formContainer: {
      paddingTop: verticalScale(49)
    },
    googleLoginContainer: {
      paddingTop: verticalScale(35)
    },
    loginOptionsContainer: {
      paddingTop: verticalScale(23)
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
    seperator: {
      borderBottomColor: colors.seperatorColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    textInputContainer: { paddingTop: verticalScale(18)},
    title: {
      fontFamily: 'Urbanist-SemiBold',
      fontSize: moderateScale(39),
      textAlign: 'left',
    },
    titleContainer: {
      paddingTop: verticalScale(74)
    }
  });
