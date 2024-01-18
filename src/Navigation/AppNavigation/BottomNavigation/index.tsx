import * as React from 'react';
import SettingsScreen from '../../../Screens/AppScreens/SettingsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppStack from '../StackNavigation';

const BottomTab = createBottomTabNavigator();

const AppBottomScreens = () => (
	  <BottomTab.Navigator screenOptions={{
		headerShown: false,
	}}>
		<BottomTab.Screen name="Home" component={AppStack} />
		<BottomTab.Screen name="Settings" component={SettingsScreen} />
	  </BottomTab.Navigator>
);


export default AppBottomScreens;
