import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import AccountScreen from '../../../Screens/AppScreens/AccountScreen';
import FeesScreen from '../../../Screens/AuthScreens/Fees';

const BottomTab = createBottomTabNavigator();

const AppBottomScreens = () => (
  <BottomTab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Fees"
    tabBar={props => <CustomTabBar {...props} />} // Use your custom tab bar component
  >
  
    <BottomTab.Screen name="Fees" component={FeesScreen} />
    <BottomTab.Screen name="Account" component={AccountScreen} />
  </BottomTab.Navigator>
);

export default AppBottomScreens;
