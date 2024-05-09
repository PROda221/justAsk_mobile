import React from 'react';
import {View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {LandingScreenStyles, getLandingScreenStyles} from './styles';
import {RenderSvg} from '../../../Components/RenderSvg';
import {justAskTempLogo} from '../../../Assets/Images';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {Typography} from '../../../Components';
import {CustomButton} from '../../../Components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {FadeInUp} from 'react-native-reanimated';

const logoView = (styles: LandingScreenStyles) => (
  <View style={styles.logoView}>
    <RenderSvg
      height={verticalScale(184)}
      width={horizontalScale(154)}
      Icon={justAskTempLogo}
    />
  </View>
);

const RenderLoginOptions = ({
  colors,
  styles,
}: {
  colors: any;
  styles: LandingScreenStyles;
}) => {
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
    <View style={styles.loginOptionsContainer}>
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
          viewStyle={styles.googleLoginButton}
        />
      </View>
    </View>
  );
};

const RenderLoginSignUp = ({
  navigation,
  styles,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
  styles: LandingScreenStyles;
}) => {
  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign Up');
  };

  return (
    <View style={styles.loginSignUpContainer}>
      <View>
        <CustomButton
          label="Log in"
          radius={95}
          textStyle={styles.loginSigninFontStyle}
          onPress={onLoginPress}
          viewStyle={styles.loginSignInButton}
        />
      </View>
      <View style={styles.signUpStyle}>
        <CustomButton
          label="Sign up"
          radius={95}
          textStyle={styles.loginSigninFontStyle}
          onPress={onSignUpPress}
          viewStyle={styles.loginSignInButton}
        />
      </View>
    </View>
  );
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const LandingScreen = ({navigation}: Props) => {
  const {colors} = useTheme();

  const styles = getLandingScreenStyles(colors);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Animated.View
          style={styles.mainContainer}
          entering={FadeInUp.duration(1000)}>
          {logoView(styles)}
          <Typography
            bgColor={colors.textPrimaryColor}
            fontWeight="600"
            textStyle={{fontSize: moderateScale(40)}}>
            {'Welcome to JustAsk'}
          </Typography>
          <RenderLoginSignUp navigation={navigation} styles={styles} />
          <RenderLoginOptions colors={colors} styles={styles} />
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LandingScreen;
