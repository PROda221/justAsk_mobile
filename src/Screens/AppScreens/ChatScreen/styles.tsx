import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type ChatScreenStyles = {
  container: ViewStyle;
  profileImage: ImageStyle;
  header: ViewStyle;
  headerTextContainer: ViewStyle;
  headerText: TextStyle;
  chatContainer: ViewStyle;
  dateText: TextStyle;
  messageContainer: ViewStyle;
  messageContainerRight: ViewStyle;
  messageText: TextStyle;
  chatTextInput: ViewStyle;
  inputContainer: ViewStyle;
  imageChat: ImageStyle
};

export const getChatScreenStyles = (colors): ChatScreenStyles =>
  StyleSheet.create<ChatScreenStyles>({
    chatContainer: {
    //   Flex: 1,
      paddingTop: verticalScale(35),
    },
    chatTextInput: {
      height: verticalScale(50),
    },
    container: {
      backgroundColor: colors.appScreenPrimaryBackground,
      flex: 1,
      paddingHorizontal: horizontalScale(35),
    },
    dateText: {
      alignSelf: 'center',
      fontSize: moderateScale(12),
      paddingBottom: verticalScale(12),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: verticalScale(21),
    },
    headerText: {
      fontSize: moderateScale(15),
      paddingLeft: horizontalScale(10),
      textAlignVertical: 'center'
    },
    headerTextContainer: {
      alignItems: 'flex-start',
      flex: 1,
      // JustifyContent: 'center',
    },
    inputContainer: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: verticalScale(52),
    },
    messageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: colors.receivedMsgColor,
      borderRadius: moderateScale(20),
      marginBottom: verticalScale(12),
      padding: moderateScale(12),
    },
    messageContainerRight: {
      alignSelf: 'flex-end',
      backgroundColor: colors.sentMsgColor,
    },
    messageText: {
      fontSize: moderateScale(13),
      textAlign: 'left',
    },
    imageChat: {
      width: horizontalScale(250),
      height: verticalScale(250)
    },
    profileImage: {
      backgroundColor: colors.primaryBackgroundColor,
      borderRadius: moderateScale(22),
      height: verticalScale(45),
      marginLeft: verticalScale(10),
      width: horizontalScale(45),
    },
  });

StyleSheet.create({});
