import {StyleSheet, TextStyle, ViewStyle } from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type GenreSelectorStyles = {
    container: ViewStyle;
    genre: TextStyle;
    genreContainer: ViewStyle;
    genreName: TextStyle;
    genreText: TextStyle;
    selectedGenre: ViewStyle;
  };

export const getGenreSelectorStyles = (colors): GenreSelectorStyles =>(StyleSheet.create<GenreSelectorStyles>({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      genre: {
        alignItems: 'center',
        backgroundColor: colors.secondaryBackgroundColor,
        borderRadius: moderateScale(50),
        height: verticalScale(100),
        justifyContent: 'center',
        width: horizontalScale(100),
      },
      genreContainer: {
        alignItems: 'center',
        margin: moderateScale(5),
      },
      genreName: {
        marginTop: verticalScale(5),
        textAlign: 'center',
      },
      genreText: {
        
        fontSize: moderateScale(12),
      },
      selectedGenre: {
        borderColor: colors.selectedGenre,
        borderWidth: moderateScale(4),
      },
  }))