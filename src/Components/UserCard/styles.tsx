import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Functions/StyleScale';

export type UserCardStyles = {
  card: ViewStyle;
  image: ViewStyle;
  username: TextStyle;
  infoContainer: ViewStyle;
  status: TextStyle;
  skillsContainer: ViewStyle;
  skill: TextStyle;
  imageContainer: ViewStyle;
};

export const getUserCardStyles = (colors): UserCardStyles =>
  StyleSheet.create<UserCardStyles>({
    card: {
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
    image: {
      borderRadius: moderateScale(50),
      height: verticalScale(100),
      width: horizontalScale(100),
    },
    imageContainer: {
      justifyContent: 'center',
      paddingLeft: horizontalScale(1),
      width: '30%',
    },
    infoContainer: {
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
    skillsContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    status: {
      color: colors.cardUserStatusStyle,
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
  });
