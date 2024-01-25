import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../../Screens/AppScreens/HomeScreen';
import DetailsPage from '../../../Screens/AppScreens/DetailsPage';
import ProgramPage from '../../../Screens/AppScreens/ProgramPage';
import OnlineCoursesScreen from '../../../Screens/AuthScreens/OnlineCourses';

const AppScreensStack = createNativeStackNavigator();

const AppStack = () => (
  <AppScreensStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AppScreensStack.Screen name="Home Stack" component={HomeScreen} />
    <AppScreensStack.Screen name="Details Page" component={DetailsPage} />
    <AppScreensStack.Screen name="Program Page" component={ProgramPage} />
    <AppScreensStack.Screen
      name={'Online Courses'}
      component={OnlineCoursesScreen}
    />
  </AppScreensStack.Navigator>
);

export default AppStack;
