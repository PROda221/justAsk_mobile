import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppBottomScreens from '../BottomNavigation';
import CustomDrawerContent from './CustomDrawerContent';
import {type DrawerParamList} from '../../types';
import OnlineCoursesScreen from '../../../Screens/AuthScreens/OnlineCourses';
import LevelQualScreen from '../../../Screens/AuthScreens/LevelQualification';
import CampusCourseScreen from '../../../Screens/AuthScreens/CampusCourses';
import LstTeenScreen from '../../../Screens/AuthScreens/LstTeen';
import FeesScreen from '../../../Screens/AuthScreens/Fees';
import AboutUsScreen from '../../../Screens/AuthScreens/AboutUs';
import ContactUsScreen from '../../../Screens/AuthScreens/ContactUs';
import LoginScreen from '../../../Screens/AuthScreens/Login';

const AppDrawer = createDrawerNavigator<DrawerParamList>();

const AppDrawerScreens = () => (
  <AppDrawer.Navigator
    screenOptions={{headerShown: false, swipeEdgeWidth: 5}} // SwipeEdgeWidth: 0 to disable swipe gestures in drawer
    // @ts-expect-error ts is acting bonkers
    drawerContent={props => <CustomDrawerContent {...props} />}>
    <AppDrawer.Screen name={'HomePage'} component={AppBottomScreens} />
    <AppDrawer.Screen name={'Online Courses'} component={OnlineCoursesScreen} />
    <AppDrawer.Screen
      name={'Level 4 Qualifications'}
      component={LevelQualScreen}
    />
    <AppDrawer.Screen name={'Campus Courses'} component={CampusCourseScreen} />
    <AppDrawer.Screen name={'LST-Teen'} component={LstTeenScreen} />
    <AppDrawer.Screen name={'Fees'} component={FeesScreen} />
    <AppDrawer.Screen name={'About Us'} component={AboutUsScreen} />
    <AppDrawer.Screen name={'Contact Us'} component={ContactUsScreen} />
    <AppDrawer.Screen name={'Login'} component={LoginScreen} />
  </AppDrawer.Navigator>
);

export default AppDrawerScreens;
