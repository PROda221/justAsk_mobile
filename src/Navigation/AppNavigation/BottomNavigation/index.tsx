import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppStack from '../StackNavigation';
import CustomTabBar from './CustomTabBar';
import OnlineCoursesScreen from '../../../Screens/AuthScreens/OnlineCourses';
import AboutUsScreen from '../../../Screens/AuthScreens/AboutUs';
import AccountScreen from '../../../Screens/AppScreens/AccountScreen';
import FeesScreen from '../../../Screens/AuthScreens/Fees';

const BottomTab = createBottomTabNavigator();

const AppBottomScreens = () => (
  <BottomTab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home Screen"
    tabBar={props => <CustomTabBar {...props} />} // Use your custom tab bar component
  >
    <BottomTab.Screen name="Online Courses" component={OnlineCoursesScreen} />
    <BottomTab.Screen name="Fees" component={FeesScreen} />
    <BottomTab.Screen name="Home Screen" component={AppStack} />
    <BottomTab.Screen name="About Us" component={AboutUsScreen} />
    <BottomTab.Screen name="Account" component={AccountScreen} />
  </BottomTab.Navigator>
);

export default AppBottomScreens;
