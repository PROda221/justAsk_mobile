import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {horizontalScale, moderateScale} from '../../Functions/StyleScale';

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

export const getToastStyles = (colors): ToastStyles =>
  StyleSheet.create<ToastStyles>({
    successBox: {
      backgroundColor: colors.toastSuccessBgColor,
      borderRadius: moderateScale(5),
      padding: moderateScale(15),
      margin: moderateScale(15),
      flexDirection: 'row',
      alignItems: 'center',
    },
    successIcon: {
      marginRight: horizontalScale(12),
    },
    successTextContainer: {
      flex: 1,
    },
    successTitle: {
      fontWeight: 'bold',
      fontSize: moderateScale(16),
    },
    successMessage: {
      textAlign: 'left',
      fontSize: moderateScale(14),
    },

    infoBox: {
      backgroundColor: colors.toastInfoBgColor,
      borderRadius: moderateScale(5),
      padding: moderateScale(15),
      margin: moderateScale(15),
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoIcon: {
      marginRight: horizontalScale(12),
    },
    infoTextContainer: {
      flex: 1,
    },
    infoTitle: {
      fontWeight: 'bold',
      fontSize: moderateScale(16),
    },
    infoMessage: {
      textAlign: 'left',
      fontSize: moderateScale(14),
    },

    errorBox: {
      backgroundColor: colors.toastErrorBgColor,
      borderRadius: moderateScale(5),
      padding: moderateScale(15),
      margin: moderateScale(15),
      flexDirection: 'row',
      alignItems: 'center',
    },
    errorIcon: {
      marginRight: horizontalScale(12),
    },
    errorTextContainer: {
      flex: 1,
    },
    errorTitle: {
      fontWeight: 'bold',
      color: colors.toastErrorTitleColor,
      fontSize: moderateScale(16),
    },
    errorMessage: {
      color: colors.toastErrorTextColor,
      textAlign: 'left',
      fontSize: moderateScale(14),
    },
  });
