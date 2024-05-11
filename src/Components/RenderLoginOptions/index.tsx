import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton} from '../CustomButton';
import {Typography} from '../Typography';
import {verticalScale, horizontalScale} from '../../Functions/StyleScale';

export const RenderLoginOptions = ({colors}: {colors: any}) => {
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo :', userInfo);
      // SetState({ userInfo });
    } catch (error) {
      if (error.code === 'SIGN_IN_CANCELLED') {
        console.log('a');
        // User cancelled the login flow
      } else if (error.code === 'IN_PROGRESS') {
        console.log('b');
        // Operation (e.g. sign in) is in progress already
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        console.log('c');
        // Play services not available or outdated
      } else {
        console.log('d', error);
        // Some other error happened
      }
    }
  };

  return (
    <View>
      <Typography
        bgColor={colors.loginOptionsTextColor}
        fontWeight="400"
        size="large">
        {'Continue With Google'}
      </Typography>
      <View style={styles.googleLoginButtonContainer}>
        <CustomButton
          label="Google"
          radius={10}
          textColor={colors.googleButtonTextColor}
          onPress={googleSignIn}
          viewStyle={[
            styles.googleLoginButton,
            {backgroundColor: colors.googleButtonColor},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  googleLoginButton: {
    height: verticalScale(57),
    width: horizontalScale(165),
  },
  googleLoginButtonContainer: {
    alignItems: 'center',
    paddingTop: verticalScale(23),
  },
});
