 import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {CustomCard} from '../../../Components';
import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaViewCompat,
} from 'react-native-safe-area-context';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackScreens, type StackParamList } from '../../../Navigation/types';
import Header from '../../../Components/Header';
import { type OnlineCourses } from '../../../Assets/Languages/englishTypes';
import content from '../../../Assets/Languages/english.json'
import { horizontalScale } from '../../../Functions/StyleScale';
import { callGetOnlineCourses } from '../../../Redux/Slices/OnlineCoursesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../Redux/rootReducers';


type PropsType = {
  navigation: NativeStackNavigationProp<StackParamList, 'Online Courses'>;
}

const onlineCoursesScreen: OnlineCourses = content.onlineCourses;

const OnlineCoursesScreen = ({navigation}: PropsType): JSX.Element => {
  const dispatch = useDispatch();

  const onlineCoursesData = useSelector(
    (state: RootState) => state.onlineCoursesSlice,
  );

  useEffect(() => {
    if(onlineCoursesData){
      dispatch(callGetOnlineCourses())
    }
    
  }, [onlineCoursesData])

  const handleCardPress = (screen: StackScreens, courseId:number) => {
    navigation.navigate(screen,{id:courseId});
  };

  return (
    <SafeAreaProvider>
      <SafeAreaViewCompat style={styles.safeAreaContainer}>
        <Header title={onlineCoursesScreen.title} />
          <FlatList
            style={styles.listPadding}
            data={onlineCoursesData?.success?.document?.records}
            keyExtractor={item=> item.id.toString()}
            numColumns={2}
            renderItem={({item}) => (
                <CustomCard
                  variant={'small'} 
                  onPress={()=>{ handleCardPress("Program Page", item?.id); }}
                  title={item?.coursetitle}
                  courseDuration={item?.courselength}
                  courseType={item?.coursetype}
                  imageSource={{uri:item?.image}}
                  courseFee={item?.coursefees.fees}
                />
            )}
            showsVerticalScrollIndicator={false}
          />
      </SafeAreaViewCompat>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  listPadding: {
    paddingHorizontal: horizontalScale(10)
  },
  safeAreaContainer: {flex: 1},
});

export default OnlineCoursesScreen;