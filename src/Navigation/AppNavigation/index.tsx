import * as React from 'react';
import EnhancedHomeScreen from '../../Screens/AppScreens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EnhancedChatScreen from '../../Screens/AppScreens/ChatScreen';
import {SheetProvider} from 'react-native-actions-sheet';
import {SocketProvider} from '../../useContexts/SocketContext';
import {baseURL} from '../../Constants';

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
        <AppStack.Screen name="ChatScreen" component={EnhancedChatScreen} />
      </AppStack.Navigator>
    </SheetProvider>
  </SocketProvider>
);

export default AppNavigation;
