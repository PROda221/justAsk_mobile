import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Functions/StyleScale';
import {DarkColors} from '../../useContexts/Theme/ThemeType';

export type ReplyMessageBarStyles = {
  container: ViewStyle;
  messageText: TextStyle;
  labelText: TextStyle;
  replyImageContainer: ViewStyle;
  forwardIconContainer: ViewStyle;
  crossButton: ViewStyle;
  replyBox: ViewStyle;
  replyImageStyle: ImageStyle;
};

export const getReplyMessageBarStyles = (
  colors: DarkColors,
): ReplyMessageBarStyles => {
  return StyleSheet.create<ReplyMessageBarStyles>({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: verticalScale(8),
      borderTopLeftRadius: moderateScale(12.84),
      borderTopRightRadius: moderateScale(12.84),
      backgroundColor: colors.secondaryBackgroundColor,
      maxHeight: verticalScale(100),
      minWidth: 'auto',
    },
    replyImageContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingRight: horizontalScale(10),
    },
    labelText: {
      fontSize: moderateScale(13),
      textAlign: 'left',
      color: colors.forwardMessageTheme,
    },
    replyImageStyle: {
      height: moderateScale(50),
      width: moderateScale(50),
    },
    replyBox: {
      justifyContent: 'flex-start',
    },
    messageText: {
      fontSize: moderateScale(13),
      textAlign: 'left',
    },
    forwardIconContainer: {
      height: '100%',
      justifyContent: 'center',
      paddingLeft: horizontalScale(8),
      paddingRight: horizontalScale(6),
      borderRightWidth: horizontalScale(2),
      borderRightColor: colors.forwardMessageTheme,
      marginRight: horizontalScale(6),
    },
    crossButton: {
      flex: 1,
      alignItems: 'flex-end',
      padding: moderateScale(4),
      maxWidth: '20%',
      marginRight: horizontalScale(15),
    },
  });
};
