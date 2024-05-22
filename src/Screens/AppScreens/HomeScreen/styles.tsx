import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type HomeScreenStyles = {
  container: ViewStyle;
  profilePicContainer: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  searchContainer: ViewStyle;
  addButton: ViewStyle;
  searchButtonTextStyle: TextStyle;
  searchButtonContainer: ViewStyle;
};

export const getHomeScreenStyles = (colors): HomeScreenStyles =>
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
    container: {
      backgroundColor: colors.appScreenPrimaryBackground,
      flex: 1,
      paddingHorizontal: horizontalScale(15)
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: verticalScale(30),
      },
    headerText: {
        color: colors.textPrimaryColor,
        fontFamily: "Urbanist-Regular",
        fontSize: moderateScale(27),
        paddingLeft: horizontalScale(15)
      },
    profilePicContainer: {
      backgroundColor: colors.secondaryBackgroundColor,
      borderRadius: moderateScale(23),
      height: verticalScale(45),
      width: verticalScale(45),
    },
      searchButtonContainer: {
        flexDirection: 'row',
        paddingTop: verticalScale(14)
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
      }
  });
