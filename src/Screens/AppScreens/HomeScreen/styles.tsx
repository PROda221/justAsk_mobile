import {
  type ImageStyle,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';

export type HomeScreenStyles = {
  container: ViewStyle;
  profilePicContainer: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  searchContainer: ViewStyle;
  addButton: ViewStyle;
  searchButtonTextStyle: TextStyle;
  searchButtonContainer: ViewStyle;
  messageContainer: ViewStyle;
  avatar: ImageStyle;
  messageName: TextStyle;
  messageText: TextStyle;
  messageTime: TextStyle;
  messagesList: ViewStyle;
  img: ImageStyle;
  messageTextContainer: ViewStyle;
  profileUsernameContainer: ViewStyle;
};

export const getHomeScreenStyles = (colors: DarkColors): HomeScreenStyles =>
  StyleSheet.create<HomeScreenStyles>({
    addButton: {
      alignItems: 'center',
      backgroundColor: colors.searchContainer,
      borderBottomRightRadius: moderateScale(10),
      borderTopRightRadius: moderateScale(10),
      height: verticalScale(40),
      justifyContent: 'center',
      width: horizontalScale(40),
    },
    avatar: {
      borderRadius: moderateScale(22),
      height: verticalScale(44),
      marginRight: horizontalScale(10),
      width: horizontalScale(44),
    },
    container: {
      backgroundColor: colors.appScreenPrimaryBackground,
      flex: 1,
      paddingHorizontal: horizontalScale(15),
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: verticalScale(30),
    },
    headerText: {
      color: colors.textPrimaryColor,
      fontFamily: 'Urbanist-Regular',
      fontSize: moderateScale(27),
    },
    img: {
      borderRadius: moderateScale(22),
      height: verticalScale(45),
      width: verticalScale(45),
    },
    messageContainer: {
      // AlignItems: 'center',
      backgroundColor: colors.appScreenPrimaryBackground,
      borderRadius: moderateScale(8),
      flexDirection: 'row',
      marginBottom: verticalScale(10),
      padding: moderateScale(10),
    },
    messageName: {
      fontSize: moderateScale(15),
      textAlign: 'left',
    },
    messageText: {
      fontSize: moderateScale(13),
      opacity: 0.5,
      textAlign: 'left',
    },
    messageTextContainer: {flex: 1},
    messageTime: {
      fontSize: moderateScale(15),
    },
    messagesList: {
      padding: moderateScale(10),
    },
    profilePicContainer: {
      backgroundColor: colors.secondaryBackgroundColor,
      borderRadius: moderateScale(23),
      height: verticalScale(45),
      justifyContent: 'center',
      width: verticalScale(45),
    },
    profileUsernameContainer: {alignItems: 'center', flexDirection: 'row'},
    searchButtonContainer: {
      flexDirection: 'row',
    },
    searchButtonTextStyle: {
      fontSize: moderateScale(14),
      paddingLeft: horizontalScale(10),
      textAlignVertical: 'center',
    },
    searchContainer: {
      alignSelf: 'center',
      backgroundColor: colors.searchContainer,
      borderBottomLeftRadius: moderateScale(10),
      borderRightWidth: 0,
      borderTopLeftRadius: moderateScale(10),
      flexDirection: 'row',
      height: verticalScale(40),
      padding: 8,
      width: horizontalScale(305),
    },
  });
