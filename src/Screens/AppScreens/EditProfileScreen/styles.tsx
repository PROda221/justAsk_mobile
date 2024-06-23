import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type EditProfileStyles = {
  gradientContainer: ViewStyle;
  container: ViewStyle;
  imageContainer: ViewStyle;
  profileImage: ImageStyle;
  nameText: TextStyle;
  statusText: TextStyle;
  skill: TextStyle;
  skillContainer: ViewStyle;
  feedbackButtonStyle: ViewStyle;
  feedbackButtonContainer: ViewStyle;
  blockIconStyle: ViewStyle;
  headerContainer: ViewStyle;
  editIcon: ViewStyle;
  statusTextInput: ViewStyle & TextStyle;
  editStatusButton: ViewStyle;
  statusEditStyle: ViewStyle;
};

export const getEditProfileStyles = (colors): EditProfileStyles =>
  StyleSheet.create<EditProfileStyles>({
    editStatusButton: {
      backgroundColor: colors.primaryBackgroundColor,
      borderRadius: moderateScale(8),
    },
    editIcon: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: colors.primaryBackgroundColor,
      borderRadius: moderateScale(12),
      padding: moderateScale(6),
    },
    headerContainer: {justifyContent: 'space-between', flexDirection: 'row'},
    blockIconStyle: {
      marginTop: verticalScale(25),
    },
    feedbackButtonContainer: {
      paddingTop: verticalScale(20),
      width: horizontalScale(200),
    },
    feedbackButtonStyle: {
      backgroundColor: colors.textInputBackgroundColor,
      borderRadius: moderateScale(95),
      height: verticalScale(63.36),
      width: '100%',
    },
    gradientContainer: {
      flex: 1,
      paddingHorizontal: horizontalScale(25),
    },
    skillContainer: {
      paddingTop: verticalScale(12),
      maxHeight: verticalScale(50),
    },
    skill: {
      backgroundColor: colors.cardGenreCellBgColor,
      borderRadius: moderateScale(10),
      color: colors.cardGenreCellTextColor,
      fontSize: moderateScale(12),
      marginBottom: verticalScale(2),
      marginRight: horizontalScale(2),
      paddingHorizontal: horizontalScale(10),
      paddingVertical: verticalScale(2),
      alignSelf: 'center',
    },
    imageContainer: {
      width: horizontalScale(165),
      height: verticalScale(165),
      borderRadius: moderateScale(83),
      borderWidth: moderateScale(2),
      borderColor: colors.profileRing,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      paddingTop: verticalScale(70),
      alignItems: 'center',
    },

    profileImage: {
      width: horizontalScale(155),
      height: verticalScale(155),
      borderRadius: moderateScale(78),
    },
    nameText: {
      fontSize: moderateScale(18),
    },
    statusTextInput: {
      fontSize: moderateScale(13),
      color: colors.textPrimaryColor,
      textAlign: 'left',
      paddingHorizontal: horizontalScale(8),
      //   backgroundColor: 'red',
      paddingVertical: 0,
      margin: 0,
    },
    statusText: {
      fontSize: moderateScale(13),
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    statusEditStyle: {
      backgroundColor: colors.primaryBackgroundColor,
      borderRadius: moderateScale(8),
      padding: moderateScale(4),
      alignSelf: 'center',
      marginLeft: horizontalScale(5),
    },
  });
