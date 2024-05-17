import * as React from 'react';
import HomeScreen from '../../Screens/AppScreens/HomeScreen';
import ProgramPage from '../../Screens/AppScreens/ProgramPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AppStack = createNativeStackNavigator();

const AppNavigation = () => (
    <AppStack.Navigator screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animation: 'fade_from_bottom',
        statusBarColor: 'black',
      }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Profile" component={ProgramPage} />
    </AppStack.Navigator>
  );

export default AppNavigation;
