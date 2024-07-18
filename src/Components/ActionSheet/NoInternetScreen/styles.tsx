import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';

export type NoInternetSheetStyles = {
  actionSheet: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
};

export const getNoInternetSheetStyles = (
  colors: DarkColors,
): NoInternetSheetStyles =>
  StyleSheet.create<NoInternetSheetStyles>({
    actionSheet: {backgroundColor: colors.appScreenPrimaryBackground},
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.appScreenPrimaryBackground,
      padding: moderateScale(20),
    },
    title: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      marginTop: moderateScale(20),
      marginBottom: verticalScale(10),
    },
    subtitle: {
      fontSize: moderateScale(16),
      textAlign: 'center',
      marginBottom: verticalScale(30),
    },
    button: {
      backgroundColor: colors.noInternetRetryButton,
      paddingHorizontal: horizontalScale(30),
      paddingVertical: verticalScale(15),
      borderRadius: moderateScale(25),
    },
    buttonText: {
      color: 'white',
      fontSize: moderateScale(18),
      fontWeight: 'bold',
    },
  });
