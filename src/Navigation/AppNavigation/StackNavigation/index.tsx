import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../../Screens/AppScreens/HomeScreen';

const AppScreensStack = createNativeStackNavigator();

const AppStack = () => (
	<AppScreensStack.Navigator  screenOptions={{
		headerShown: false,
	}}>
		<AppScreensStack.Screen name="Home Stack" component={HomeScreen} />
	</AppScreensStack.Navigator>
);


export default AppStack;
