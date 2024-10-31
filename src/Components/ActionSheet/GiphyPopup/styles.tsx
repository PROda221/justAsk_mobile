import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import {moderateScale} from '../../../Functions/StyleScale';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';

export type GiphyPopupStyles = {
  container: ViewStyle;
  textInput: ViewStyle;
  giphyGridStyle: ViewStyle;
  actionSheet: ViewStyle;
  giphyTrademarkImg: ImageStyle;
  trademarkContainer: ViewStyle;
};

export const getGiphyPopupStyles = (colors: DarkColors): GiphyPopupStyles =>
  StyleSheet.create<GiphyPopupStyles>({
    actionSheet: {backgroundColor: colors.appScreenPrimaryBackground},
    container: {
      padding: moderateScale(10),
    },
    textInput: {minHeight: moderateScale(45)},
    giphyGridStyle: {height: moderateScale(200), marginTop: moderateScale(50)},
    trademarkContainer: {position: 'absolute', bottom: 0, right: 0},
    giphyTrademarkImg: {
      height: moderateScale(50),
      width: moderateScale(100),
      alignSelf: 'flex-end',
    },
  });
