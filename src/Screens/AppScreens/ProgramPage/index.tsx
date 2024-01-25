import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomCard, Typography} from '../../../Components';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../Functions/StyleScale';

import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaViewCompat,
} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import content from '../../../Assets/Languages/english.json';
import {type ProgramScreenType} from '../../../Assets/Languages/englishTypes';

import CourseOverview from './CourseOverview';
import ModulesCovered from './ModulesOverview';
import Review from './Review';

const windowWidth = Dimensions.get('window').width;

const programScreenContent: ProgramScreenType = content.ProgramScreen;

type CardData = {
  id: string;
  title: string;
  imageSource: {uri: string};
};

const cardData: CardData[] = [
  {id: '1', title: 'Card 1', imageSource: {uri: 'https://picsum.photos/700'}},
  {id: '2', title: 'Card 2', imageSource: {uri: 'https://picsum.photos/701'}},
  {id: '3', title: 'Card 3', imageSource: {uri: 'https://picsum.photos/702'}},
  {id: '4', title: 'Card 4', imageSource: {uri: 'https://picsum.photos/703'}},
];

const ProgramPage = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const [selectedTab, setSelectedTab] = useState<
    'CourseOverview' | 'ModulesCovered' | 'Review'
  >('CourseOverview');

  const renderContent = () => {
    switch (selectedTab) {
      case 'CourseOverview':
        return <CourseOverview />;
      case 'ModulesCovered':
        return <ModulesCovered />;
      case 'Review':
        return <Review />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaViewCompat style={styles.safeAreaContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons name={'chevron-left'} size={25} color="#000000" />
          </TouchableOpacity>
          <Typography
            bgColor={'black'}
            type={'displayLarge'}
            size={'large'}
            fontWeight="00">
            {route.name}
          </Typography>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{}}>
            <Image
              source={{uri: 'https://picsum.photos/702'}}
              style={styles.imageCorouselStyle}
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: 259,
                height: 273,
              }}>
              <View style={{paddingLeft: 20, paddingTop: 20}}>
                <View style={{marginBottom: 10}}>
                  <Typography
                    bgColor={'white'}
                    type={'bodyLarge'}
                    size={'large'}
                    fontWeight="700">
                    Level
                    <Typography
                      bgColor={'white'}
                      type={'bodyMedium'}
                      size={'medium'}
                      fontWeight="700">
                      - Beginner
                    </Typography>
                  </Typography>
                </View>
                <View style={{marginBottom: 10}}>
                  <Typography
                    bgColor={'white'}
                    type={'bodyLarge'}
                    size={'large'}
                    fontWeight="700">
                    Duration
                    <Typography
                      bgColor={'white'}
                      type={'bodyMedium'}
                      size={'medium'}
                      fontWeight="700">
                      - 6 Week
                    </Typography>
                  </Typography>
                </View>
                <View style={{marginBottom: 10}}>
                  <Typography
                    bgColor={'white'}
                    type={'bodyMedium'}
                    size={'medium'}
                    fontWeight="700">
                    Certified Diploma
                  </Typography>
                </View>
                <View>
                  <Typography
                    bgColor={'white'}
                    type={'bodyMedium'}
                    size={'medium'}
                    fontWeight="700">
                    Course Delivered 100% Online
                  </Typography>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 20,
                  paddingBottom: 20,
                  position: 'absolute',
                  bottom: 0,
                }}>
                <Typography
                  bgColor={'white'}
                  type={'titleLarge'}
                  size={'large'}
                  fontWeight="700">
                  ₹30,000.00
                </Typography>
                <TouchableOpacity
                  style={{
                    height: 38,
                    width: 111,
                    backgroundColor: '#29F408',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Typography
                    bgColor={'#000000'}
                    type={'titleMedium'}
                    size={'medium'}
                    fontWeight="700">
                    Enroll Now
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            {/* Tab buttons */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  selectedTab === 'CourseOverview' && styles.selectedTab,
                ]}
                onPress={() => {
                  setSelectedTab('CourseOverview');
                }}>
                <View>
                  <Typography
                    bgColor={'#000000'}
                    type={'titleSmall'}
                    size={'medium'}
                    fontWeight={
                      selectedTab === 'CourseOverview' ? '600' : '400'
                    }>
                    {`Course Overview`}
                  </Typography>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  selectedTab === 'ModulesCovered' && styles.selectedTab,
                ]}
                onPress={() => {
                  setSelectedTab('ModulesCovered');
                }}>
                <Typography
                  bgColor={'#000000'}
                  type={'titleSmall'}
                  size={'medium'}
                  fontWeight={selectedTab === 'ModulesCovered' ? '600' : '400'}>
                  {`Modules Covered`}
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  selectedTab === 'Review' && styles.selectedTab,
                ]}
                onPress={() => {
                  setSelectedTab('Review');
                }}>
                <Typography
                  bgColor={'#000000'}
                  type={'titleSmall'}
                  size={'medium'}
                  fontWeight={selectedTab === 'Review' ? '600' : '400'}>
                  {`Review`}
                </Typography>
              </TouchableOpacity>
            </View>
            {renderContent()}
          </View>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Typography
                bgColor="black"
                type="titleSmall"
                size="large"
                fontWeight="700">
                {programScreenContent.moreCourses}
              </Typography>
            </View>
            <FlatList
              horizontal
              data={cardData}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <CustomCard
                  variant={'small'}
                  onPress={console.log('clicked')}
                  title={item.title}
                  imageSource={item.imageSource}
                  mode={'elevated'}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaViewCompat>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },

  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },

  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  safeAreaContainer: {flex: 1},

  selectedTab: {
    borderBottomWidth: 2,
  },

  selectedText: {
    fontWeight: 'bold',
  },

  tabButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },

  tabContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    paddingVertical: 16,
  },
  imageCorouselStyle: {
    height: 273,
    width: 473,
    alignSelf: 'center',
  },
});

export default ProgramPage;
