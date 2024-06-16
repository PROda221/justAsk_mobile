import * as React from 'react';
import EnhancedHomeScreen from '../../Screens/AppScreens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../../Screens/AppScreens/ChatScreen';
import {SheetProvider} from 'react-native-actions-sheet';
import {SocketProvider} from '../../useContexts/SocketContext';
import {baseURL} from '../../Constants';
import UserProfile from '../../Screens/AppScreens/ProfileScreen';
import FeedbackScreen from '../../Screens/AppScreens/FeedbackScreen';

const AppStack = createNativeStackNavigator();

const AppNavigation = () => (
  <SocketProvider url={baseURL}>
    <SheetProvider>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          animation: 'fade_from_bottom',
          statusBarColor: 'black',
        }}>
        <AppStack.Screen name="Home" component={EnhancedHomeScreen} />
        <AppStack.Screen name="ChatScreen" component={ChatScreen} />
        <AppStack.Screen name="UserProfile" component={UserProfile} />
        <AppStack.Screen name="UserFeedback" component={FeedbackScreen} />
      </AppStack.Navigator>
    </SheetProvider>
  </SocketProvider>
);

export default AppNavigation;
