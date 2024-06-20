import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type SettingsScreenStyles = {
  editContainer: ViewStyle;
  headingText: TextStyle;
  headerContainer: ViewStyle;
  container: ViewStyle;
  headerStyle: ViewStyle;
  profileContainer: ViewStyle;
  profilePic: ImageStyle;
  profileText: ViewStyle;
  profileName: TextStyle;
  profileStatus: TextStyle;
  menuItem: ViewStyle;
  menuText: TextStyle;
};

export const getSettingsScreenStyles = (colors): SettingsScreenStyles =>
  StyleSheet.create<SettingsScreenStyles>({
    container: {
      flex: 1,
      backgroundColor: colors.primaryBackgroundColor,
      padding: moderateScale(16),
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: verticalScale(31),
    },
    headerStyle: {
      paddingTop: 0,
    },
    profilePic: {
      width: horizontalScale(74),
      height: verticalScale(74),
      borderRadius: moderateScale(37),
    },
    profileText: {
      marginLeft: horizontalScale(16),
    },
    profileName: {
      fontSize: moderateScale(20),
    },
    headingText: {
      fontSize: moderateScale(24),
      paddingLeft: horizontalScale(28),
    },
    profileStatus: {
      fontSize: moderateScale(12),
      textAlign: 'left',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: verticalScale(16),
      borderBottomWidth: 1,
      borderBottomColor: colors.settingsSeperator,
    },
    menuText: {
      marginLeft: horizontalScale(16),
      fontSize: moderateScale(16),
    },
    editContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {flexDirection: 'row', alignItems: 'center'},
  });
