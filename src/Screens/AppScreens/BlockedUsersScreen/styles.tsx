import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';

export type BlockedUsersScreenStyles = {
  container: ViewStyle;
  card: ViewStyle;
  selectedItem: ViewStyle;
  image: ImageStyle;
  info: ViewStyle;
  status: TextStyle;
  skill: TextStyle;
  buttonContainer: ViewStyle;
  backButtonContainer: ViewStyle;
  username: TextStyle;
  imageContainer: ViewStyle;
  headerContainer: ViewStyle;
  headingText: TextStyle;
  listConatiner: ViewStyle;
};

export const getBlockedUsersScreenStyles = (
  colors: DarkColors,
): BlockedUsersScreenStyles =>
  StyleSheet.create<BlockedUsersScreenStyles>({
    container: {
      flex: 1,
      padding: moderateScale(16),
      backgroundColor: colors.appScreenPrimaryBackground,
    },
    imageContainer: {
      justifyContent: 'center',
      paddingLeft: horizontalScale(1),
      width: '30%',
    },
    card: {
      padding: moderateScale(10),
      backgroundColor: colors.cardBackgroundColor,
      borderRadius: moderateScale(10),
      elevation: moderateScale(5),
      flexDirection: 'row',
      margin: moderateScale(10),
      overflow: 'hidden',
      shadowColor: colors.cardShadowColor,
      shadowOffset: {width: 0, height: verticalScale(2)},
      shadowOpacity: 0.2,
      shadowRadius: moderateScale(10),
    },
    selectedItem: {
      backgroundColor: colors.cellSelectedColor, // Light cyan background for selected items
      borderColor: colors.cellSelectedColor, // Cyan border for selected items
    },
    image: {
      alignSelf: 'center',
      borderRadius: moderateScale(40),
      height: verticalScale(80),
      width: horizontalScale(80),
    },
    info: {
      flex: 1,
      padding: moderateScale(10),
    },
    skill: {
      backgroundColor: colors.cardGenreCellBgColor,
      borderRadius: moderateScale(10),
      color: colors.cardGenreCellTextColor,
      fontSize: moderateScale(12),
      marginBottom: verticalScale(2),
      marginRight: horizontalScale(2),
      paddingHorizontal: horizontalScale(8),
      paddingVertical: verticalScale(2),
    },
    buttonContainer: {
      marginTop: verticalScale(10),
    },
    backButtonContainer: {
      paddingTop: 0,
    },
    status: {
      fontSize: moderateScale(14),
      marginBottom: verticalScale(10),
      textAlign: 'left',
    },
    username: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      marginBottom: verticalScale(5),
      textAlign: 'left',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headingText: {
      fontSize: moderateScale(24),
      paddingLeft: horizontalScale(28),
      justifyContent: 'center',
    },
    listConatiner: {
      paddingTop: verticalScale(10),
    },
  });
