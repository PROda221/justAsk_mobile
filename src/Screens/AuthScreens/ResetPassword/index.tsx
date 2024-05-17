import {ScrollView, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, TextInput, Typography} from '../../../Components';
import styled from 'styled-components';
import {ResetPassScreenStyles, getResetPassScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useForm} from 'react-hook-form';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Regex} from '../../../Functions/Regex';
import {useResetPass} from './CustomHooks/useResetPass';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: ResetPassScreenStyles;
  colors: any;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {'Reset Your'}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {'Password'}
    </Typography>
  </>
);

const ResetPassword = ({navigation, route}: Props): JSX.Element => {
  const {control, handleSubmit, getValues} = useForm();
  const {callResetPassApi, resetPassError, resetResetPassReducer} =
    useResetPass(navigation, 'Login');

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();

  const styles = getResetPassScreenStyles(colors);

  const handleNextButton = (data: {
    password: string;
    confirmPassword: string;
  }) => {
    resetResetPassReducer();
    callResetPassApi({password: data.password, emailId: route.params?.emailId, otp: route.params?.otp});
  };

  const renderError = () => (
    <View>
      <Typography
        bgColor={colors.errorTextPrimary}
        size="medium"
        fontWeight="400">
        {resetPassError?.message}
      </Typography>
    </View>
  );

  const renderForm = () => (
    <>
      <TextInput
        name="password"
        secureTextEntry={true}
        control={control}
        label="Password"
        placeholder="Password"
        leftIcon="lock"
        rules={{
          required: 'Password is reqired',
          pattern: {
            value: Regex.password,
            message:
              'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
          },
        }}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          name="confirmPassword"
          secureTextEntry={true}
          control={control}
          label="Confirm Password"
          placeholder="Confirm Password"
          leftIcon="lock"
          rules={{
            required: 'Confirm Password is reqired',
            validate: (value: string) =>
              value === getValues('password') || 'Password does not match',
          }}
        />
      </View>
      {resetPassError && renderError()}
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={handleSubmit(handleNextButton)}
          label="Reset"
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
          <Header />
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
