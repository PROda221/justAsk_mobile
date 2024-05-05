import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/AuthScreens/Login';
import SignUp from '../../Screens/AuthScreens/SignUp';
import ForgotPassword from '../../Screens/AuthScreens/ForgotPassword';

const AuthScreens = createNativeStackNavigator();

const AuthStack = (): JSX.Element => (
	<AuthScreens.Navigator>
		<AuthScreens.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
		<AuthScreens.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
		<AuthScreens.Screen name="Forgot Password" component={ForgotPassword} options={{ headerShown: false }} />
	</AuthScreens.Navigator>
);

export default AuthStack;
