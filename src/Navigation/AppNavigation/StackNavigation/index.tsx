import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../../Screens/AppScreens/HomeScreen';
import ProgramPage from '../../../Screens/AppScreens/ProgramPage';
import { type StackParamList } from '../../types';
import LevelQualScreen from '../../../Screens/AuthScreens/LevelQualification';
import OnlineCoursesScreen from '../../../Screens/AuthScreens/OnlineCourses';

const AppScreensStack = createNativeStackNavigator<StackParamList>();

const AppStack = () => (
  <AppScreensStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AppScreensStack.Screen name="HomePage" component={HomeScreen} />
    <AppScreensStack.Screen name="Program Page" component={ProgramPage} />
    <AppScreensStack.Screen
      name={'Online Courses'}
      component={OnlineCoursesScreen}
    />
    <AppScreensStack.Screen
      name={'Level 4 Qualifications'}
      component={LevelQualScreen}
    />
  </AppScreensStack.Navigator>
);

export default AppStack;
