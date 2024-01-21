import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppBottomScreens from '../BottomNavigation';
import CustomDrawerContent from '../../../Screens/AppScreens/CustomDrawerContent';
import { type DrawerParamList } from '../../types';

const AppDrawer = createDrawerNavigator<DrawerParamList>();

const AppDrawerScreens = () => (
  <AppDrawer.Navigator
    screenOptions={{ headerShown: false, swipeEdgeWidth: 5 }} // SwipeEdgeWidth: 0 to disable swipe gestures in drawer
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <AppDrawer.Screen name="HomeDrawer" component={AppBottomScreens} />
  </AppDrawer.Navigator>
);

export default AppDrawerScreens;
