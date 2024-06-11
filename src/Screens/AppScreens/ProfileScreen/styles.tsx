import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type UserProfileStyles = {
    container: ViewStyle
};

export const getUserProfileStyles = (colors): UserProfileStyles =>
  StyleSheet.create<UserProfileStyles>({
    container: {
        flex: 1,
        backgroundColor: colors.appScreenPrimaryBackground,
        paddingTop: verticalScale(70)
      },

      time: {
        fontSize: 16,
      },
      icons: {
        flexDirection: 'row',
      },
      icon: {
        width: horizontalScale(45),
        height: verticalScale(45),
        marginLeft: 5,
      },
      profileContainer: {
        alignItems: 'center',
        padding: 20,
      },
      profileImage: {
        width: horizontalScale(100),
        height: verticalScale(100),
        borderRadius: moderateScale(50),
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      jobTitle: {
        fontSize: 18,
        color: 'gray',
      },
      location: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
      },
      statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
      },
      stat: {
        fontSize: 16,
        color: 'gray',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
      },
      button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
  });
