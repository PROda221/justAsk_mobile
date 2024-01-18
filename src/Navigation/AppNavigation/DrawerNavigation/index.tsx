import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppBottomScreens from '../BottomNavigation';


const AppDrawer = createDrawerNavigator();


const AppDrawerScreens = () => (
	<AppDrawer.Navigator>
		<AppDrawer.Screen name="Home Drawer" component={AppBottomScreens} />
	</AppDrawer.Navigator>
);


export default AppDrawerScreens;
