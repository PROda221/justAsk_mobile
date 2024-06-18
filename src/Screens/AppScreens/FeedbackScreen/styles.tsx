import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type FeedbackScreenStyles = {
  gradientContainer: ViewStyle;
  giveFeedbackText: TextStyle;
  giveFeedbackStarsStyle: ViewStyle;
  card: ViewStyle;
  commentBox: TextStyle;
  commentContainer: ViewStyle;
  submitButtonStyle: ViewStyle;
  commentCard: ViewStyle;
  commentUserAvatar: ImageStyle;
  usernameText: TextStyle;
  commentHeaderContainer: ViewStyle;
  commentStarContainer: ViewStyle;
  starText: TextStyle;
  commentText: TextStyle;
  mainHeader: ViewStyle;
  profileImage: ImageStyle;
  nameText: TextStyle;
  statusText: TextStyle;
  skillContainer: ViewStyle;
  skill: TextStyle;
  profileNameStatusContainer: ViewStyle;
  profileContainer: ViewStyle;
  timeText: TextStyle;
  commentsHeading: TextStyle;
  backButtonContainer: ViewStyle
  noCommentsText: TextStyle;
  emptyStateImageStyle: ImageStyle
};

export const getFeedbackScreenStyles = (colors): FeedbackScreenStyles =>
  StyleSheet.create<FeedbackScreenStyles>({
    gradientContainer: {
      flex: 1,
      paddingHorizontal: horizontalScale(16),
    },
    giveFeedbackText: {
      fontSize: moderateScale(18),
      textAlign: 'left',
      paddingLeft: horizontalScale(8),
      paddingTop: verticalScale(10),
    },
    giveFeedbackStarsStyle: {
      paddingTop: verticalScale(5),
    },
    card: {
      paddingVertical: verticalScale(10),
      borderWidth: moderateScale(1),
      borderColor: colors.cardGenreCellBgColor,
      borderRadius: moderateScale(10),
      backgroundColor: colors.appScreenPrimaryBackground,
    },
    commentTextInput: {
      height: verticalScale(564),
    },
    commentBox: {
      height: verticalScale(150),
      borderColor: colors.commentBoxColor,
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(20),
      padding: moderateScale(10),
      fontSize: moderateScale(16),
      color: 'white',
      backgroundColor: colors.appScreenPrimaryBackground,
      textAlignVertical: 'top', // Align text at the top for multiline input
    },
    commentContainer: {
      padding: moderateScale(10),
    },
    submitButtonStyle: {
      backgroundColor: colors.textInputBackgroundColor,
      borderRadius: moderateScale(95),
      height: verticalScale(45),
      width: horizontalScale(180),
      marginLeft: horizontalScale(10),
    },
    commentCard: {
      // flexDirection: 'row',
      paddingVertical: verticalScale(10),
      borderWidth: moderateScale(1),
      borderColor: colors.cardGenreCellBgColor,
      borderRadius: moderateScale(10),
      backgroundColor: colors.appScreenPrimaryBackground,
      marginTop: verticalScale(10),
    },
    commentUserAvatar: {
      width: horizontalScale(35),
      height: verticalScale(35),
      borderRadius: moderateScale(18),
      marginLeft: horizontalScale(10),
    },
    usernameText: {
      fontSize: moderateScale(12),
      paddingLeft: horizontalScale(10),
      textAlign: 'left',
      textAlignVertical: 'center',
    },
    starText: {
      fontSize: moderateScale(12),
      paddingLeft: horizontalScale(10),
      textAlign: 'left',
    },
    commentHeaderContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      flex: 1,
    },
    commentStarContainer: {
      flexDirection: 'row',
      paddingRight: horizontalScale(10),
    },
    commentText: {
      textAlign: 'justify',
      paddingHorizontal: horizontalScale(10),
      paddingTop: verticalScale(5),
      fontSize: moderateScale(12),
    },
    mainHeader: {
      flexDirection: 'row',
    },
    profileImage: {
      width: horizontalScale(100),
      height: verticalScale(100),
      borderRadius: moderateScale(50),
    },
    nameText: {
      fontSize: moderateScale(18),
    },
    timeText: {
      fontSize: moderateScale(12),
      paddingLeft: horizontalScale(5),
      textAlign: 'left',
      textAlignVertical: 'center',
    },
    statusText: {
      fontSize: moderateScale(13),
    },
    skillContainer: {
      // paddingTop: verticalScale(15),
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
    profileNameStatusContainer: {
      alignItems: 'flex-start',
      paddingLeft: horizontalScale(10),
      flex: 1,
    },
    profileContainer: {
      flexDirection: 'row',
      paddingVertical: moderateScale(10),
      flex: 1,
    },
    commentsHeading: {
      paddingTop: verticalScale(10),
      fontFamily: 'Urbanist-SemiBold',
      fontSize: moderateScale(25),
      textAlign: 'left',
    },
    backButtonContainer: {
      paddingBottom: verticalScale(10)
    },
    noCommentsText: {
      fontSize: moderateScale(18),
    },
    emptyStateImageStyle: {
      width: moderateScale(150),
      height: moderateScale(150),
    }
  });

StyleSheet.create({});
