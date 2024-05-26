import * as React from 'react';
import HomeScreen from '../../Screens/AppScreens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../../Screens/AppScreens/ChatScreen';
import {SheetProvider} from 'react-native-actions-sheet';

const AppStack = createNativeStackNavigator();

const AppNavigation = () => (
  <SheetProvider>
    <AppStack.Navigator screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animation: 'fade_from_bottom',
        statusBarColor: 'black',
      }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="ChatScreen" component={ChatScreen} />
    </AppStack.Navigator>
  </SheetProvider>
  );

export default AppNavigation;
