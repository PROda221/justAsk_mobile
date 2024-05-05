import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppBottomScreens from '../BottomNavigation';
import CustomDrawerContent from './CustomDrawerContent';
import {type DrawerParamList} from '../../types';


const AppDrawer = createDrawerNavigator<DrawerParamList>();

const AppDrawerScreens = () => (
  <AppDrawer.Navigator
    screenOptions={{headerShown: false, swipeEdgeWidth: 5}} // SwipeEdgeWidth: 0 to disable swipe gestures in drawer
    // @ts-expect-error ts is acting bonkers
    drawerContent={props => <CustomDrawerContent {...props} />}>
    <AppDrawer.Screen name={'HomePage'} component={AppBottomScreens} />
  </AppDrawer.Navigator>
);

export default AppDrawerScreens;
