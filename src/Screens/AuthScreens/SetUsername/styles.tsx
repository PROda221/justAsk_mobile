import {StyleSheet, type TextStyle, type ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';

export type SetUsernameScreenStyles = {
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
  errorStyle: TextStyle;
  alreadyHaveAnAccountContainer: ViewStyle;
};

export const getSetUsernameScreenStyles = (
  colors: DarkColors,
): SetUsernameScreenStyles =>
  StyleSheet.create<SetUsernameScreenStyles>({
    alreadyHaveAnAccount: {
      fontSize: moderateScale(16),
      paddingTop: verticalScale(14),
    },
    alreadyHaveAnAccountContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonContainer: {
      paddingTop: verticalScale(18),
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
    safeAreaContainer: {
      backgroundColor: colors.primaryBackgroundColor,
      flex: 1,
    },
    seperator: {
      borderBottomColor: colors.seperatorColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    subTitle: {
      fontFamily: 'Urbanist-Regular',
      fontSize: moderateScale(14),
      paddingTop: verticalScale(10),
      textAlign: 'left',
    },
    textInputContainer: {paddingTop: verticalScale(18)},
    title: {
      fontFamily: 'Urbanist-SemiBold',
      fontSize: moderateScale(39),
      textAlign: 'left',
    },
    titleContainer: {
      paddingTop: verticalScale(74),
    },
  });
