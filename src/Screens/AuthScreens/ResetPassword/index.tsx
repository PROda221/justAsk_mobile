import {Alert, ScrollView, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, TextInput, Typography} from '../../../Components';
import styled from 'styled-components';
import {type ResetPassScreenStyles, getResetPassScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {type FieldValues, type SubmitHandler, useForm} from 'react-hook-form';
import {
  CommonActions,
  type ParamListBase,
  type RouteProp,
} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Regex} from '../../../Functions/Regex';
import {useSelector} from 'react-redux';
import {type RootState} from '../../../Redux/rootReducers';
import {useResetPass} from '../../../CustomHooks/AuthHooks/useResetPass';
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';
import content from '../../../Assets/Languages/english.json';
import ErrorBox from '../../../Components/ErrorBox';

type Params = {
  params: {
    emailId: string;
    otp: string;
  };
};
type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<Params>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: ResetPassScreenStyles;
  colors: DarkColors;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.ResetPassScreen.title1}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.ResetPassScreen.title2}
    </Typography>
  </>
);

const ResetPassword = ({navigation, route}: Props): JSX.Element => {
  const {control, handleSubmit, getValues} = useForm();
  const {isLogin} = useSelector((state: RootState) => state.isLoginSlice);
  const {
    callResetPassApi,
    resetPassError,
    resetResetPassReducer,
    resetPassLoading,
  } = useResetPass(navigation, isLogin ? 'Settings' : 'Login');

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();

  const styles = getResetPassScreenStyles(colors);

  const handleNextButton: SubmitHandler<FieldValues> = data => {
    resetResetPassReducer();
    callResetPassApi({
      password: data.password as string,
      emailId: route.params?.emailId,
      otp: route.params?.otp,
    });
  };

  const handleBackButton = () => {
    Alert.alert(
      `${content.ResetPassScreen.alertTitle}`,
      `${content.ResetPassScreen.alertMessage}`,
      [
        {
          text: `${content.ResetPassScreen.cancel}`,
          style: 'cancel',
        },
        {
          text: `${content.ResetPassScreen.agree}`,
          onPress: () =>
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'LandingScreen'}, {name: 'Login'}],
              }),
            ),
        },
      ],
    );
  };

  const renderForm = () => (
    <>
      <TextInput
        name="password"
        secureTextEntry={true}
        control={control}
        label="Password"
        placeholder={String(content.ResetPassScreen.password)}
        leftIcon="lock"
        rules={{
          required: content.ResetPassScreen.passwordMissing,
          pattern: {
            value: Regex.password,
            message: String(content.ResetPassScreen.passwordRequirement),
          },
        }}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          name="confirmPassword"
          secureTextEntry={true}
          control={control}
          label={String(content.ResetPassScreen.confirmPass)}
          placeholder={String(content.ResetPassScreen.confirmPass)}
          leftIcon="lock"
          rules={{
            required: content.ResetPassScreen.confirmPassMissing,
            validate: (value: string) =>
              value === getValues('password') ||
              String(content.ResetPassScreen.passwordMismatch),
          }}
        />
      </View>
      {resetPassError && (
        <ErrorBox title="Error" message={resetPassError?.message} />
      )}
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={resetPassLoading}
          onPress={handleSubmit(handleNextButton)}
          label={String(content.ResetPassScreen.resetPass)}
          radius={14}
        />
      </View>
    </>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          style={styles.mainContainer}>
          <Header onPress={handleBackButton} dontGoBack={true} />
          <Scroll>
            <View style={styles.titleContainer}>
              <RenderTitle styles={styles} colors={colors} />
            </View>
            <View style={styles.formContainer}>{renderForm()}</View>
          </Scroll>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ResetPassword;
