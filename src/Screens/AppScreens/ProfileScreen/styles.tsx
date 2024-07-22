import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';

export type UserProfileStyles = {
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
  noFeedbackText: TextStyle;
  usernameContainer: ViewStyle;
  statusContainer: ViewStyle;
  feedbackContainer: ViewStyle;
  feedbackStarsStyle: TextStyle;
};

export const getUserProfileStyles = (colors: DarkColors): UserProfileStyles =>
  StyleSheet.create<UserProfileStyles>({
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
      backgroundColor: colors.appScreenPrimaryBackground,
    },
    skillContainer: {
      paddingTop: verticalScale(15),
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
    statusText: {
      fontSize: moderateScale(13),
    },
    noFeedbackText: {
      flex: 1,
      fontSize: moderateScale(13),
      textAlign: 'center',
    },
    usernameContainer: {paddingTop: verticalScale(8)},
    statusContainer: {paddingTop: verticalScale(11)},
    feedbackContainer: {paddingTop: verticalScale(5)},
    feedbackStarsStyle: {flex: 1, alignSelf: 'center'},
  });
