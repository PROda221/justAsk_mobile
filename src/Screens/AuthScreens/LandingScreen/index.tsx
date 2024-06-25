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
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {RenderLoginOptions} from '../../../Components/RenderLoginOptions';

const logoView = (styles: LandingScreenStyles) => (
  <View style={styles.logoView}>
    <RenderSvg
      height={verticalScale(184)}
      width={horizontalScale(154)}
      Icon={justAskTempLogo}
    />
  </View>
);

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
          <View style={styles.headerTextContainer}>
            <Typography
              bgColor={colors.textPrimaryColor}
              fontWeight="600"
              textStyle={styles.headingText}>
              {'Welcome to JustAsk'}
            </Typography>
          </View>
          <RenderLoginSignUp navigation={navigation} styles={styles} />
          <View style={styles.loginOptionsContainer}>
            <RenderLoginOptions colors={colors} />
          </View>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LandingScreen;
