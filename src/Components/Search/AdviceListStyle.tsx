import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Functions/StyleScale';

export type AdviceListStyles = {
  main: ViewStyle;
  cell: ViewStyle;
  container: ViewStyle;
  icon: ViewStyle;
  itemName: TextStyle;
  selected: ViewStyle;
  unselected: ViewStyle;
  subTitle: TextStyle;
  headerStyle: ViewStyle;
  headerContainer: ViewStyle;
};

export const getAdviceListStyles = (colors): AdviceListStyles =>
  StyleSheet.create<AdviceListStyles>({
    cell: {
      alignItems: 'center',
      borderRadius: moderateScale(10),
      borderWidth: moderateScale(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: moderateScale(5),
      padding: moderateScale(10),
      width: '45%',
    },
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    headerContainer: {
      flexDirection: 'row',
      paddingBottom: verticalScale(10),
    },
    headerStyle: {paddingTop: 0},
    icon: {
      marginRight: horizontalScale(10),
    },
    itemName: {
      flexGrow: 1,
      fontSize: moderateScale(12),
      textAlign: 'left',
    },
    main: {
      backgroundColor: colors.appScreenPrimaryBackground,
      borderRadius: moderateScale(8),
      padding: moderateScale(10),
    },
    selected: {
      backgroundColor: colors.cellSelectedColor,
      borderColor: colors.cellSelectedBorderColor,
    },
    subTitle: {
      fontFamily: 'Urbanist-Regular',
      fontSize: moderateScale(20),
      paddingLeft: horizontalScale(16),
      textAlignVertical: 'center',
    },
    unselected: {
      backgroundColor: colors.cellUnSelectedColor,
      borderColor: colors.cellUnSelectedBorderColor,
    },
  });
