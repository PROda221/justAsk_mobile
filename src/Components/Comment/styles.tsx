import {StyleSheet, TextStyle} from 'react-native';
import {DarkColors} from '../../useContexts/Theme/ThemeType';
import {verticalScale} from '../../Functions/StyleScale';

export type CommentStyles = {
  readMoreText: TextStyle;
  textStyle: TextStyle;
};

export const getCommentStyles = (colors: DarkColors): CommentStyles =>
  StyleSheet.create<CommentStyles>({
    readMoreText: {
      color: colors.showMore,
      marginTop: verticalScale(5),
    },
    textStyle: {
      position: 'absolute',
      opacity: 0,
    },
  });
