import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/AuthScreens/Login';
import SignUp from '../../Screens/AuthScreens/SignUp';
import ForgotPassword from '../../Screens/AuthScreens/ForgotPassword';
import LandingScreen from '../../Screens/AuthScreens/LandingScreen';
import OtpScreen from '../../Screens/AuthScreens/Otp';
import ResetPassword from '../../Screens/AuthScreens/ResetPassword';
import SelectGenres from '../../Screens/AuthScreens/SelectGenres';

const AuthScreens = createNativeStackNavigator();

const AuthStack = (): JSX.Element => (
  <AuthScreens.Navigator
    screenOptions={{
      headerShown: false,
      presentation: 'modal',
      animation: 'fade_from_bottom',
      statusBarColor: 'black',
    }}>
    <AuthScreens.Screen name="LandingScreen" component={LandingScreen} />
    <AuthScreens.Screen name="Login" component={LoginScreen} />
    <AuthScreens.Screen name="Sign Up" component={SignUp} />
    <AuthScreens.Screen name="Select Genres" component={SelectGenres} />
    <AuthScreens.Screen name="Forgot Password" component={ForgotPassword} />
	<AuthScreens.Screen name="Otp Screen" component={OtpScreen} />
	<AuthScreens.Screen name="Reset Password" component={ResetPassword} />
  </AuthScreens.Navigator>
);

export default AuthStack;
