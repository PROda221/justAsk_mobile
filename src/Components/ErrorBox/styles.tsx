import {StyleSheet, type TextStyle, type ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Functions/StyleScale';
import {type DarkColors} from '../../useContexts/Theme/ThemeType';

export type ErrorBoxStyles = {
  closeButton: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  message: TextStyle;
  title: TextStyle;
  footer: ViewStyle;
};

export const getErrorBoxStyles = (colors: DarkColors): ErrorBoxStyles =>
  StyleSheet.create<ErrorBoxStyles>({
    closeButton: {
      padding: moderateScale(5),
    },
    container: {
      backgroundColor: colors.errorBoxBgColor,
      borderColor: colors.errorBoxBorderColor,
      borderRadius: moderateScale(10),
      borderWidth: 1,
      marginTop: verticalScale(10),
      padding: moderateScale(15),
    },
    footer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    message: {
      fontSize: moderateScale(14),
      marginVertical: verticalScale(10),
      textAlign: 'left',
    },
    title: {
      flex: 1,
      fontSize: moderateScale(16),
      fontWeight: 'bold',
      marginLeft: horizontalScale(5),
      textAlign: 'left',
    },
  });
