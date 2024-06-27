import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {horizontalScale, moderateScale} from '../../Functions/StyleScale';
import {DarkColors} from '../../useContexts/Theme/ThemeType';

export type ToastStyles = {
  successBox: ViewStyle;
  successIcon: ViewStyle;
  successTextContainer: ViewStyle;
  successTitle: TextStyle;
  successMessage: TextStyle;

  errorBox: ViewStyle;
  errorIcon: ViewStyle;
  errorTextContainer: ViewStyle;
  errorTitle: TextStyle;
  errorMessage: TextStyle;

  infoBox: ViewStyle;
  infoIcon: ViewStyle;
  infoTextContainer: ViewStyle;
  infoTitle: TextStyle;
  infoMessage: TextStyle;
};

export const getToastStyles = (colors: DarkColors): ToastStyles =>
  StyleSheet.create<ToastStyles>({
    errorBox: {
      alignItems: 'center',
      backgroundColor: colors.toastErrorBgColor,
      borderRadius: moderateScale(5),
      flexDirection: 'row',
      margin: moderateScale(15),
      padding: moderateScale(15),
    },
    errorIcon: {
      marginRight: horizontalScale(12),
    },
    errorMessage: {
      color: colors.toastErrorTextColor,
      fontSize: moderateScale(14),
      textAlign: 'left',
    },
    errorTextContainer: {
      flex: 1,
    },
    errorTitle: {
      color: colors.toastErrorTitleColor,
      fontSize: moderateScale(16),
      fontWeight: 'bold',
    },

    infoBox: {
      alignItems: 'center',
      backgroundColor: colors.toastInfoBgColor,
      borderRadius: moderateScale(5),
      flexDirection: 'row',
      margin: moderateScale(15),
      padding: moderateScale(15),
    },
    infoIcon: {
      marginRight: horizontalScale(12),
    },
    infoMessage: {
      fontSize: moderateScale(14),
      textAlign: 'left',
    },
    infoTextContainer: {
      flex: 1,
    },
    infoTitle: {
      fontSize: moderateScale(16),
      fontWeight: 'bold',
    },

    successBox: {
      alignItems: 'center',
      backgroundColor: colors.toastSuccessBgColor,
      borderRadius: moderateScale(5),
      flexDirection: 'row',
      margin: moderateScale(15),
      padding: moderateScale(15),
    },
    successIcon: {
      marginRight: horizontalScale(12),
    },
    successMessage: {
      fontSize: moderateScale(14),
      textAlign: 'left',
    },
    successTextContainer: {
      flex: 1,
    },
    successTitle: {
      fontSize: moderateScale(16),
      fontWeight: 'bold',
    },
  });
