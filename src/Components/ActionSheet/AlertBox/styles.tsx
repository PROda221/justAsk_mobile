import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';

export type AlertBoxStyles = {
  actionSheet: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  center: ViewStyle;
  cancelOkContainer: ViewStyle;
};

export const getAlertBoxStyles = (colors: DarkColors): AlertBoxStyles =>
  StyleSheet.create<AlertBoxStyles>({
    actionSheet: {backgroundColor: colors.appScreenPrimaryBackground},
    center: {
      alignItems: 'center',
    },
    container: {
      backgroundColor: colors.appScreenPrimaryBackground,
      padding: moderateScale(20),
    },
    title: {
      textAlign: 'center',
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
      alignSelf: 'center',
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
    cancelOkContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
