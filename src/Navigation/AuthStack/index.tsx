import * as React from 'react';
import LoginScreen from '../../Screens/AuthScreens/Login';
import SignUp from '../../Screens/AuthScreens/SignUp';
import ForgotPassword from '../../Screens/AuthScreens/ForgotPassword';
import LandingScreen from '../../Screens/AuthScreens/LandingScreen';
import OtpScreen from '../../Screens/AuthScreens/Otp';
import ResetPassword from '../../Screens/AuthScreens/ResetPassword';
import SelectGenres from '../../Screens/AuthScreens/SelectGenres';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = (): JSX.Element => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      presentation: 'modal',
      animation: 'fade_from_bottom',
      statusBarColor: 'black',
    }}>
    <AuthStack.Screen name="LandingScreen" component={LandingScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Sign Up" component={SignUp} />
    <AuthStack.Screen name="Select Genres" component={SelectGenres} />
    <AuthStack.Screen name="Forgot Password" component={ForgotPassword} />
	<AuthStack.Screen name="Otp Screen" component={OtpScreen} />
	<AuthStack.Screen name="Reset Password" component={ResetPassword} />
  </AuthStack.Navigator>
);

export default AuthNavigation;
