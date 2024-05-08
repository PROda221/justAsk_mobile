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
import {TextInput} from '../../../Components';
import {Control, useForm} from 'react-hook-form';

const logoView = (styles: LandingScreenStyles) => (
  <View style={styles.logoView}>
    <RenderSvg
      height={verticalScale(184)}
      width={horizontalScale(154)}
      Icon={justAskTempLogo}
    />
  </View>
);

const renderLoginSignUp = (control: Control<FormData, unknown>, styles: LandingScreenStyles) => (
  <View style={styles.loginSignUpContainer}>
    <View>
      <TextInput
        viewStyle={styles.textInput}
        control={control}
        label="Log In"
        name="login"
        placeholder="Log in"
        secureTextEntry={false}
      />
    </View>
    <View style={styles.signUpStyle}>
      <TextInput
        viewStyle={styles.textInput}
        control={control}
        label="Log In"
        name="signup"
        placeholder="Sign up"
        secureTextEntry={false}
      />
    </View>
    </View>
);

const LandingScreen = () => {
  const {control, handleSubmit} = useForm<FormData>();
  const {colors} = useTheme();

  const styles = getLandingScreenStyles(colors);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.mainContainer}>
          {logoView(styles)}
          <Typography
            bgColor={colors.textPrimaryColor}
            fontWeight="600"
            textStyle={{fontSize: moderateScale(40)}}>
            {'Welcome to JustAsk'}
          </Typography>
          {renderLoginSignUp(control, styles)}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LandingScreen;
