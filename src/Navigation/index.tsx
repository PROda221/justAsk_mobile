import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppNavigation from './AppNavigation';
import AuthStack from './AuthStack';

const Navigation = (): JSX.Element => {
	const auth = true;
	return (
		<NavigationContainer>
			{auth ? <AppNavigation /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default Navigation;