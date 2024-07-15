import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {moderateScale, verticalScale} from '../../Functions/StyleScale';
import {DarkColors} from '../../useContexts/Theme/ThemeType';

export type SearchStyles = {
  searchContainer: ViewStyle;
  searchTextInput: ViewStyle;
  noSearchContainer: ViewStyle;
  noSearchText: TextStyle;
  actionSheetContainer: ViewStyle;
};

export const getSearchStyles = (colors: DarkColors): SearchStyles =>
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
    actionSheetContainer: {
      backgroundColor: colors.appScreenPrimaryBackground,
    },
  });
