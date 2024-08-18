import {StyleSheet, type TextStyle, type ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Functions/StyleScale';
import {type DarkColors} from '../../useContexts/Theme/ThemeType';

export type InfoBoxStyles = {
  closeButton: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  message: TextStyle;
  title: TextStyle;
  footer: ViewStyle;
};

export const getInfoBoxStyles = (colors: DarkColors): InfoBoxStyles =>
  StyleSheet.create<InfoBoxStyles>({
    closeButton: {
      padding: moderateScale(5),
    },
    container: {
      backgroundColor: colors.infoBoxBgColor,
      borderColor: colors.infoBoxBorderColor,
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
