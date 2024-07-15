import {StyleSheet, ViewStyle} from 'react-native';
import {moderateScale, verticalScale} from '../../Functions/StyleScale';
import {DarkColors} from '../../useContexts/Theme/ThemeType';

export type ProgressBarStyles = {
  progressBar: ViewStyle;
  progress: ViewStyle;
};

export const getProgressBarStyles = (colors: DarkColors): ProgressBarStyles => {
  return StyleSheet.create<ProgressBarStyles>({
    progressBar: {
      width: '100%',
      height: verticalScale(5),
      backgroundColor: colors.progressBarBgColor,
      borderRadius: moderateScale(10),
      overflow: 'hidden',
      marginBottom: verticalScale(5),
    },
    progress: {
      height: '100%',
      backgroundColor: colors.progressBarColor,
    },
  });
};
