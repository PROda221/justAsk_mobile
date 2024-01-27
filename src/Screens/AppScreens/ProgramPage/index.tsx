import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {CustomCard, Typography} from '../../../Components';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaViewCompat,
} from 'react-native-safe-area-context';
import content from '../../../Assets/Languages/english.json';
import {type ProgramsPage} from '../../../Assets/Languages/englishTypes';

import CourseOverview from './CourseOverview';
import ModulesCovered from './ModulesOverview';
import Review from './Review';
import Header from '../../../Components/Header';
import styled from 'styled-components/native';
import {colors} from '../../../DesignTokens/Colors';

const programScreenContent: ProgramsPage = content.ProgramScreen;

const Scroll = styled(ScrollView)`
  flex-grow: 1;
`;

const EnrollContainer = styled(View)`
  position: absolute;
  height: 100%;
  width: 259px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const EnrollButton = styled(TouchableOpacity)`
  height: 38px;
  width: 111px;
  background-color: ${colors.lightGreen};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 15px;
`;

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

const renderContent = (selectedTab: string) => {
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

const ProgramPage = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<
    'CourseOverview' | 'ModulesCovered' | 'Review'
  >('CourseOverview');

  return (
    <SafeAreaProvider>
      <SafeAreaViewCompat style={styles.safeAreaContainer}>
        <Header title={programScreenContent.title} />
        <Scroll>
          <View>
            <Image
              source={{uri: 'https://picsum.photos/702'}}
              style={styles.imageCorouselStyle}
            />
            <EnrollContainer>
              <View style={styles.enrollContentSpace}>
                <View style={styles.enrollTextSpace}>
                  <Typography
                    textStyle={styles.textLeft}
                    bgColor={colors.white}
                    size={'medium'}
                    fontWeight="700">
                    {programScreenContent.level}
                    <Typography
                      bgColor={colors.white}
                      size={'medium'}
                      fontWeight="400">
                      {' - Beginner'}
                    </Typography>
                  </Typography>
                </View>
                <View style={styles.enrollTextSpace}>
                  <Typography
                    textStyle={styles.textLeft}
                    bgColor={colors.white}
                    size={'medium'}
                    fontWeight="700">
                    {programScreenContent.duration}
                    <Typography
                      bgColor={colors.white}
                      size={'medium'}
                      fontWeight="400">
                      {' - 6 Week'}
                    </Typography>
                  </Typography>
                </View>
                <View style={styles.enrollTextSpace}>
                  <Typography
                    bgColor={colors.white}
                    textStyle={styles.textLeft}
                    size={'medium'}
                    fontWeight="400">
                    {'Certified Diploma'}
                  </Typography>
                </View>
                <View>
                  <Typography
                    bgColor={colors.white}
                    size={'medium'}
                    textStyle={styles.textLeft}
                    fontWeight="400">
                    {'Course Delivered 100% Online'}
                  </Typography>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Typography
                  textStyle={styles.textLeft}
                  bgColor={colors.white}
                  size={'large'}
                  fontWeight="700">
                  {'₹30,000.00'}
                </Typography>
                <EnrollButton>
                  <Typography
                    bgColor={colors.black}
                    size={'medium'}
                    fontWeight="700"
                    textStyle={styles.textLeft}>
                    {programScreenContent.enrollNow}
                  </Typography>
                </EnrollButton>
              </View>
            </EnrollContainer>
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
                <Typography
                  bgColor={colors.black}
                  size={'medium'}
                  textStyle={styles.textLeft}
                  fontWeight={selectedTab === 'CourseOverview' ? '700' : '400'}>
                  {programScreenContent.courseOverview}
                </Typography>
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
                  bgColor={colors.black}
                  size={'medium'}
                  textStyle={styles.textLeft}
                  fontWeight={selectedTab === 'ModulesCovered' ? '700' : '400'}>
                  {programScreenContent.modulesCovered}
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
                  bgColor={colors.black}
                  size={'medium'}
                  textStyle={styles.textLeft}
                  fontWeight={selectedTab === 'Review' ? '700' : '400'}>
                  {programScreenContent.review}
                </Typography>
              </TouchableOpacity>
            </View>
            {renderContent(selectedTab)}
          </View>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Typography bgColor={colors.black} size="large" fontWeight="700">
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
                  onPress={() => {
                    console.log('clicked');
                  }}
                  title={item.title}
                  imageSource={item.imageSource}
                />
              )}
            />
          </View>
        </Scroll>
      </SafeAreaViewCompat>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: horizontalScale(15),
  },

  enrollContentSpace: {
    paddingLeft: horizontalScale(15),
    paddingTop: verticalScale(20),
  },

  enrollTextSpace: {
    marginBottom: verticalScale(10),
  },

  imageCorouselStyle: {
    alignSelf: 'center',
    height: verticalScale(273),
    width: '100%',
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priceContainer: {
    paddingLeft: horizontalScale(15),
    paddingTop: verticalScale(20),
  },
  safeAreaContainer: {flex: 1},
  selectedTab: {
    borderBottomWidth: moderateScale(2),
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: verticalScale(10),
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(16),
  },
  textLeft: {
    textAlign: 'left',
  },
});

export default ProgramPage;
