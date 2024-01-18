import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/AuthScreens/Login';

const AuthScreens = createNativeStackNavigator();

const AuthStack = (): JSX.Element => (
	<AuthScreens.Navigator>
		<AuthScreens.Screen name="Login" component={LoginScreen} />
	</AuthScreens.Navigator>
);

export default AuthStack;
