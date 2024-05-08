import {StyleSheet} from 'react-native';
// Import {colors} from '../../../DesignTokens/Colors';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export const getLoginStyles = (colors) => StyleSheet.create({
        button: {
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: moderateScale(18),
            justifyContent: 'center',
            marginHorizontal: horizontalScale(18),
            padding: moderateScale(12),
          },
        
          buttonView: {
            justifyContent: 'flex-end',
            marginHorizontal: horizontalScale(12),
            marginTop: verticalScale(16),
          },
        
          container: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: horizontalScale(12),
            marginVertical: verticalScale(8),
          },
        
          header: {fontSize: 30, textAlign: 'left'},
        
          input: {marginBottom: verticalScale(10)},
        
          line: {
            backgroundColor: colors.grey,
            flex: 1,
            height: 1,
          },
        
          login: {
            color: colors.blue,
          },
        
          safeAreaContainer: {
            backgroundColor: colors.black,
            flex: 1,
          },
        
          signUpButton: {
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: moderateScale(12),
            justifyContent: 'center',
            width: '100%',
          },
        
          terms: {alignItems: 'center', flexDirection: 'row'},
        
          text: {
            color: colors.white,
            marginHorizontal: horizontalScale(8),
          },
        
          welcomeText: {
            marginVertical: verticalScale(16),
          },
    })
