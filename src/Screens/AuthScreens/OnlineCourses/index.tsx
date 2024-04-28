import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomCard} from '../../../Components';
import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaViewCompat,
} from 'react-native-safe-area-context';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type StackParamList} from '../../../Navigation/types';
import Header from '../../../Components/Header';
import {type OnlineCourses} from '../../../Assets/Languages/englishTypes';
import content from '../../../Assets/Languages/english.json';
import {horizontalScale} from '../../../Functions/StyleScale';
import {
  callGetOnlineCourses,
  type OnlineCoursesType,
  type Record,
} from '../../../Redux/Slices/OnlineCoursesSlice';
import {type RouteProp} from '@react-navigation/native';
import {type RootState} from '../../../Redux/rootReducers';
import {useDispatch, useSelector} from 'react-redux';
import { type CampusCoursesTypes } from '../../../Redux/Slices/CampusCoursesSlice';
import { type Level4CoursesTypes } from '../../../Redux/Slices/Level4CoursesSlice';

type PropsType = {
  navigation: NativeStackNavigationProp<StackParamList, 'Online Courses'>;
  route: RouteProp<StackParamList, 'Online Courses'>;
};

const onlineCoursesScreen: OnlineCourses = content.onlineCourses;

const OnlineCoursesScreen = ({navigation, route}: PropsType): JSX.Element => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState(route?.params?.item);

  const onlineCoursesData = useSelector(
    (state: RootState) => state.onlineCoursesSlice,
  );

  useEffect(() => {
    if (!onlineCoursesData || !itemData) {
      dispatch(callGetOnlineCourses());
    }
  }, [onlineCoursesData]);

  useEffect(() => {
    if (onlineCoursesData && !itemData) {
      setItemData(onlineCoursesData.success);
    }
  }, []);

  const handleCardPress = (item: Record, list: CampusCoursesTypes
    | Level4CoursesTypes
    | OnlineCoursesType
    | undefined) => {
    navigation.navigate('Program Page', {item, list});
  };

  return (
    <SafeAreaProvider>
      <SafeAreaViewCompat style={styles.safeAreaContainer}>
        <Header title={onlineCoursesScreen.title} />
        <FlatList
          style={styles.listPadding}
          data={itemData?.document?.records}
          keyExtractor={item => `${item.id}`}
          numColumns={2}
          renderItem={({item}) => (
            <CustomCard
              variant={'small'}
              onPress={() => {
                handleCardPress(item, itemData);
              }}
              title={item?.coursetitle}
              courseDuration={item?.courselength}
              courseType={item?.coursetype}
              imageSource={{uri: item?.image}}
              courseFee={
                item.coursefee
                  ? item.coursefee
                  : item.coursefees?.fees
                    ? item.coursefees.fees
                    : '30000'
              }
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
    paddingHorizontal: horizontalScale(10),
  },
  safeAreaContainer: {flex: 1},
});

export default OnlineCoursesScreen;
