import {StyleSheet, ViewStyle} from 'react-native';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../Functions/StyleScale';

export type HeaderStyles = {
  backButtonContainer: ViewStyle;
};

export const getHeaderStyles = (colors): HeaderStyles =>
  StyleSheet.create<HeaderStyles>({
    backButtonContainer: {
        alignItems: 'center',
        backgroundColor: colors.backButtonContainerColor,
        borderRadius: moderateScale(15),
        height: verticalScale(45),
        justifyContent: 'center',
        width: horizontalScale(45),
    }
  });
