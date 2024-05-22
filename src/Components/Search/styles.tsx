import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Functions/StyleScale';

export type SearchStyles = {
  searchContainer: ViewStyle;
  searchTextInput: ViewStyle;
  noSearchContainer: ViewStyle;
  noSearchText: TextStyle;
};

export const getSearchStyles = (colors): SearchStyles =>
  StyleSheet.create<SearchStyles>({
    noSearchContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: verticalScale(10),
    },
    noSearchText: {
      fontSize: moderateScale(18),
      paddingTop: verticalScale(2),
    },
    searchContainer: {
      backgroundColor: colors.appScreenPrimaryBackground,
      padding: moderateScale(8),
    },
    searchTextInput: {
      height: verticalScale(40),
    },
  });
