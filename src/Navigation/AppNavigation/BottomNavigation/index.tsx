import * as React from 'react';
import SettingsScreen from '../../../Screens/AppScreens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppStack from '../StackNavigation';
import CustomTabBar from '../../../Screens/AppScreens/CustomTabBar';

const BottomTab = createBottomTabNavigator();

const AppBottomScreens = () => (
  <BottomTab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <CustomTabBar {...props} />} // Use your custom tab bar component
  >
    <BottomTab.Screen name="Home Bottom Screen" component={AppStack} />
    <BottomTab.Screen name="Settings" component={SettingsScreen} />
  </BottomTab.Navigator>
);

export default AppBottomScreens;
