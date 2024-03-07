import {View, ScrollView, FlatList, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Typography} from '../../../Components';
import content from '../../../Assets/Languages/english.json';
import {type HomeScreenType} from '../../../Assets/Languages/englishTypes';
import {CustomCard} from '../../../Components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import Header from '../../../Components/Header';
import CardContainer from '../../../Components/CardContainer';
import {type StackParamList} from '../../../Navigation/types';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {colors} from '../../../DesignTokens/Colors';
import {Profile} from '../../../Assets/Images';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import Carousel from 'react-native-reanimated-carousel';
import {useDispatch, useSelector} from 'react-redux';
import {callHomeSlider} from '../../../Redux/Slices/HomeSliderSlice';
import {type RootState} from '../../../Redux/rootReducers';
import {callHomeStudentPortfoliosSlider} from '../../../Redux/Slices/HomeStudentPortfoliosSlider';
import {
  type OnlineCoursesType,
  callGetOnlineCourses,
} from '../../../Redux/Slices/OnlineCoursesSlice';
import {
  type CampusCoursesTypes,
  callCampusCourses,
} from '../../../Redux/Slices/CampusCoursesSlice';
import {
  type Level4CoursesTypes,
  callLevel4Courses,
} from '../../../Redux/Slices/Level4CoursesSlice';
import {type Record} from '../../../Redux/Slices/OnlineCoursesSlice';

type CardTeamData = {
  id: string;
  title: string;
  imageSource: {uri: string};
  name: string;
  occupation: string;
};

type CarouselData = {
  id: string;
  title: string;
  imageSource: {uri: string};
};

const carouselData: CarouselData[] = [
  {id: '1', title: 'Card 1', imageSource: {uri: 'https://picsum.photos/700'}},
  {id: '2', title: 'Card 2', imageSource: {uri: 'https://picsum.photos/701'}},
  {id: '3', title: 'Card 3', imageSource: {uri: 'https://picsum.photos/702'}},
  {id: '4', title: 'Card 4', imageSource: {uri: 'https://picsum.photos/703'}},
];

const cardTeamData: CardTeamData[] = [
  {
    id: '1',
    title: 'Card 1',
    imageSource: {uri: 'https://picsum.photos/700'},
    name: 'rajat',
    occupation: 'Interior Design &Styling',
  },
  {
    id: '2',
    title: 'Card 2',
    imageSource: {uri: 'https://picsum.photos/701'},
    name: 'sangeeta',
    occupation: 'Interior Design &Styling',
  },
  {
    id: '3',
    title: 'Card 3',
    imageSource: {uri: 'https://picsum.photos/702'},
    name: 'nishant',
    occupation: 'Interior Design &Styling',
  },
  {
    id: '4',
    title: 'Card 4',
    imageSource: {uri: 'https://picsum.photos/703'},
    name: 'alpha',
    occupation: 'Interior Design &Styling',
  },
];

const homeScreenContent: HomeScreenType = content.homeScreen;

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'HomePage'>;
};

const Scroll = styled(ScrollView)`
  flex-grow: 1;
  padding: 0 8px 0 8px;
`;

const HomeScreen = ({navigation}: Props): JSX.Element => {
  const dispatch = useDispatch();

  const homeStudentPortfoliosSliderData = useSelector(
    (state: RootState) => state.homeStudentPortfoliosSlider,
  );

  const onlineCoursesData = useSelector(
    (state: RootState) => state.onlineCoursesSlice,
  );

  const campusCoursesData = useSelector(
    (state: RootState) => state.campusCoursesSlice,
  );

  const level4CoursesData = useSelector(
    (state: RootState) => state.level4CoursesSlice,
  );

  useEffect(() => {
    dispatch(callHomeSlider());
    dispatch(callHomeStudentPortfoliosSlider());
    dispatch(callGetOnlineCourses());
    dispatch(callCampusCourses());
    dispatch(callLevel4Courses());
  }, []);

  const handleViewAllPress = (
    item:
      | CampusCoursesTypes
      | Level4CoursesTypes
      | OnlineCoursesType
      | undefined,
  ) => {
    navigation.navigate('Online Courses', {item});
  };

  const handleCardPress = (item: Record, list: CampusCoursesTypes
    | Level4CoursesTypes
    | OnlineCoursesType
    | undefined) => {
    navigation.navigate('Program Page', {item, list });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const RenderPagination = () => (
    <View style={styles.paginatorContainer}>
      {carouselData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginator,
            {
              backgroundColor:
                index === currentIndex ? colors.black : colors.lightGrey,
            },
          ]}
        />
      ))}
    </View>
  );
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={homeScreenContent.headerTitle} drawer />
        <Scroll>
          <Carousel
            width={horizontalScale(400 - 40)}
            height={verticalScale(224)}
            data={carouselData}
            autoPlay={false}
            onProgressChange={(_, absoluteProgress) => {
              setCurrentIndex(Math.round(absoluteProgress));
            }}
            renderItem={({item}) => (
              <Image source={item.imageSource} style={styles.carouselImage} />
            )}
          />
          <RenderPagination />
          <CardContainer
            fontColor="black"
            fontSize="large"
            fontWeight="700"
            buttonTitle={homeScreenContent.viewAll}
            title={homeScreenContent.onlineCourse}
            buttonVariant="typeD"
            buttonImg
            buttonOnPress={() => {
              handleViewAllPress(onlineCoursesData.success);
            }}>
            <FlatList
              horizontal
              data={onlineCoursesData?.success?.document?.records}
              keyExtractor={item => `${item?.id}`}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <CustomCard
                  variant={'small'}
                  onPress={() => {
                    handleCardPress(item, onlineCoursesData.success);
                  }}
                  title={item?.coursetitle}
                  imageSource={{uri: item?.image}}
                  courseFee={item?.coursefees?.fees}
                  courseDuration={item?.courselength}
                  courseType={item?.coursetype}
                />
              )}
            />
          </CardContainer>
          <CardContainer
            fontColor="black"
            fontSize="large"
            fontWeight="700"
            buttonTitle={homeScreenContent.viewAll}
            title={homeScreenContent.level4Qualification}
            buttonVariant="typeD"
            buttonImg
            buttonOnPress={() => {
              handleViewAllPress(level4CoursesData.success);
            }}>
            <FlatList
              horizontal
              data={level4CoursesData?.success?.document?.records}
              keyExtractor={item => `${item?.id}`}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <CustomCard
                  variant={'small'}
                  onPress={() => {
                    handleCardPress(item, level4CoursesData?.success);
                  }}
                  title={item?.coursetitle}
                  imageSource={{uri: item?.image}}
                  courseFee={item?.coursefee}
                  courseDuration={item?.courselength}
                  courseType={item?.coursetype}
                />
              )}
            />
          </CardContainer>
          <CardContainer
            fontColor="black"
            fontSize="large"
            fontWeight="700"
            title={homeScreenContent.campusCourses}
            buttonTitle={homeScreenContent.viewAll}
            buttonVariant="typeD"
            buttonImg
            buttonOnPress={() => {
              handleViewAllPress(campusCoursesData.success);
            }}>
            <FlatList
              horizontal
              data={campusCoursesData?.success?.document?.records}
              keyExtractor={item => `${item?.id}`}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <CustomCard
                  variant={'small'}
                  onPress={() => {
                    handleCardPress(item, campusCoursesData?.success);
                  }}
                  title={item?.coursetitle}
                  imageSource={{uri: item?.image}}
                  courseFee={item?.coursefee}
                  courseDuration={item?.courselength}
                  courseType={item?.coursetype}
                />
              )}
            />
          </CardContainer>
          <CardContainer
            fontColor="black"
            fontSize="large"
            fontWeight="700"
            buttonTitle={homeScreenContent.viewAll}
            title={homeScreenContent.meetTheTeam}
            buttonVariant="typeD"
            buttonOnPress={() => {
              console.log('abc')
            }}>
            <FlatList
              horizontal
              data={cardTeamData}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View>
                  <CustomCard
                    variant={'medium'}
                    onPress={() => {
                      console.log('hello');
                    }}
                    title={item.title}
                    imageSource={item.imageSource}
                  />
                  <View>
                    <Typography
                      bgColor={'black'}
                      fontWeight="700"
                      size="medium">
                      {item.title}
                    </Typography>
                    <Typography bgColor={'black'} fontWeight="400" size="small">
                      {item.occupation}
                    </Typography>
                  </View>
                </View>
              )}
            />
          </CardContainer>
          <CardContainer
            fontColor="black"
            fontSize="large"
            fontWeight="700"
            buttonTitle={homeScreenContent.viewAll}
            title={homeScreenContent.ourStudentPortfolios}
            buttonImg
            buttonVariant="typeD"
            buttonOnPress={() => {
              console.log('abc')
            }}>
            <FlatList
              horizontal
              data={homeStudentPortfoliosSliderData?.success?.document?.records}
              keyExtractor={(item, index) => `${index}`}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <CustomCard
                  variant={'large'}
                  onPress={() => {
                    console.log('hello');
                  }}
                  title={`${index}`}
                  imageSource={{uri: item}}
                />
              )}
            />
          </CardContainer>

          <CardContainer
            fontColor={colors.black}
            fontSize="large"
            fontWeight="700"
            title={homeScreenContent.whatOurStudentSay}>
            <View style={styles.studentsPoint}>
              <Profile width={horizontalScale(72)} height={verticalScale(72)} />
              <Typography
                bgColor={colors.black}
                size={'medium'}
                textStyle={styles.textStyle}
                fontWeight={'400'}>
                {
                  'The course proved to be immensely engaging and beneficial, particularly in light of my aspirations to embark on a career in fashion communication...'
                }
              </Typography>
            </View>
          </CardContainer>
        </Scroll>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  carouselImage: {
    borderRadius: moderateScale(10),
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },

  paginator: {
    borderRadius: moderateScale(5),
    height: verticalScale(5),
    marginHorizontal: moderateScale(5),
    width: horizontalScale(5),
  },

  paginatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },

  safeAreaContainer: {backgroundColor: colors.white, flex: 1},
  studentsPoint: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: moderateScale(5),
    flexDirection: 'row',
    height: verticalScale(140),
    justifyContent: 'space-between',
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(16),
    width: horizontalScale(350),
  },

  textStyle: {
    fontSize: moderateScale(12), // Overriding the font size
    maxWidth: horizontalScale(250),
    paddingLeft: horizontalScale(10),
    textAlign: 'left',
  },
});

export default HomeScreen;
