import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton} from '../CustomButton';
import {Typography} from '../Typography';
import {verticalScale, horizontalScale} from '../../Functions/StyleScale';
import {type DarkColors} from '../../useContexts/Theme/ThemeType';
import content from '../../Assets/Languages/english.json';
import {useGoogleLogin} from '../../CustomHooks/AuthHooks/useGoogleLogin';
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  colors: DarkColors;
  navigation: NativeStackNavigationProp<ParamListBase>;
};

export const RenderLoginOptions = ({colors, navigation}: Props) => {
  const {callGoogleLoginApi, googleLoginLoading} = useGoogleLogin(navigation);
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const token = await auth().currentUser?.getIdToken();
      callGoogleLoginApi({idToken: token ?? ''});
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
    <View style={styles.googleLoginContainer}>
      <Typography
        bgColor={colors.loginOptionsTextColor}
        fontWeight="400"
        size="large">
        {content.LoginScreen.continueWithGoogle}
      </Typography>
      <View style={styles.googleLoginButtonContainer}>
        <CustomButton
          loading={googleLoginLoading}
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
    paddingTop: verticalScale(23),
  },
  googleLoginContainer: {
    alignItems: 'center',
  },
});
