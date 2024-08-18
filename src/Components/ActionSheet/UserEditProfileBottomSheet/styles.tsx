import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {moderateScale} from '../../../Functions/StyleScale';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';

export type EditProfileSheetStyles = {
  actionSheet: ViewStyle;
  container: ViewStyle;
  option: ViewStyle;
  textStyle: TextStyle;
  separator: ViewStyle;
  statusHeader: ViewStyle;
};

export const getEditProfileSheetStyles = (
  colors: DarkColors,
): EditProfileSheetStyles =>
  StyleSheet.create<EditProfileSheetStyles>({
    actionSheet: {backgroundColor: colors.appScreenPrimaryBackground},
    container: {
      height: 'auto',
      borderTopRightRadius: moderateScale(10),
      borderTopLeftRadius: moderateScale(10),
      backgroundColor: colors.appScreenPrimaryBackground,
    },
    option: {
      padding: moderateScale(20),
    },
    textStyle: {
      fontSize: moderateScale(16),
    },
    separator: {
      borderBottomColor: 'white',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    statusHeader: {
      padding: moderateScale(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
