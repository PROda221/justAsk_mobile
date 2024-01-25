import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import {CustomButton, Typography} from '../../../Components';
import content from '../../../Assets/Languages/english.json';
import {type HomeScreenType} from '../../../Assets/Languages/englishTypes';
import {CustomCard} from '../../../Components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;

type CardData = {
  id: string;
  title: string;
  imageSource: {uri: string};
};

type CardTeamData = {
  id: string;
  title: string;
  imageSource: {uri: string};
  name: string;
  occupation: string;
};

type CardPortfoliosData = {
  id: string;
  title: string;
  imageSource: {uri: string};
};

const carouselData: CardData[] = [
  {
    id: '1',
    title: 'Carousel 1',
    imageSource: {uri: 'https://picsum.photos/800/400'},
  },
  {
    id: '2',
    title: 'Carousel 2',
    imageSource: {uri: 'https://picsum.photos/800/401'},
  },
  {
    id: '3',
    title: 'Carousel 3',
    imageSource: {uri: 'https://picsum.photos/800/402'},
  },
  // Add more items as needed
];

const cardData: CardData[] = [
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

const cardPortfoliosData: CardPortfoliosData[] = [
  {id: '1', title: 'Card 1', imageSource: {uri: 'https://picsum.photos/700'}},
  {id: '2', title: 'Card 2', imageSource: {uri: 'https://picsum.photos/701'}},
  {id: '3', title: 'Card 3', imageSource: {uri: 'https://picsum.photos/702'}},
  {id: '4', title: 'Card 4', imageSource: {uri: 'https://picsum.photos/703'}},
];

const homeScreenContent: HomeScreenType = content.homeScreen;

const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation();

  const handleViewAllPress = (screem: string) => {
    navigation.navigate('Details Page');
  };

  const handleCardPress = (programId: string) => {
    navigation.navigate('Program Page');
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                flexDirection: 'row',
                margin: 16,
                alignItems: 'center',
              }}>
              <MaterialIcons
                name={'menu'}
                size={24}
                color="#BEBEBE"
                onPress={openDrawer}
              />
              <Text style={{color: '#BEBEBE', fontSize: 16, marginLeft: 10}}>
                Welcome to LST
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {/* <Carousel
                data={carouselData}
                renderItem={renderCarouselItem}
                sliderWidth={windowWidth}
                itemWidth={windowWidth - 40}
                layout={'default'}
                useScrollView={false}
                layoutCardOffset={9}
                onSnapToItem={index => {
                  setActiveSlide(index);
                }}
              /> */}
              {/* Pagination component */}
              {/* <Pagination
                dotsLength={carouselData.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainerStyle}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              /> */}
            </View>
            <View>
              <View style={styles.innerContainer}>
                <Typography
                  bgColor="black"
                  type="displayLarge"
                  size="large"
                  fontWeight="600
                  ">
                  {homeScreenContent.onlineCourse}
                </Typography>
                <CustomButton
                  onPress={handleViewAllPress}
                  label={'View All'}
                  variant={'tertiary'}
                />
              </View>

              <FlatList
                horizontal
                data={cardData}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <CustomCard
                    variant={'small'}
                    onPress={handleCardPress}
                    title={item.title}
                    imageSource={item.imageSource}
                    mode={'elevated'}
                  />
                )}
              />
            </View>
            <View>
              <View style={styles.innerContainer}>
                <Typography
                  bgColor="black"
                  type="displayLarge"
                  size="large"
                  fontWeight="600">
                  {homeScreenContent.level4Qualification}
                </Typography>
                <CustomButton
                  onPress={handleViewAllPress}
                  label={'View All'}
                  variant={'tertiary'}
                />
              </View>
              <FlatList
                horizontal
                data={cardData}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <CustomCard
                    variant={'small'}
                    onPress={handleCardPress}
                    title={item.title}
                    imageSource={item.imageSource}
                    mode={'elevated'}
                  />
                )}
              />
            </View>
            <View>
              <View style={styles.innerContainer}>
                <Typography
                  bgColor="black"
                  type="displayLarge"
                  size="large"
                  fontWeight="600">
                  {homeScreenContent.campusCourses}
                </Typography>
                <CustomButton
                  onPress={handleViewAllPress}
                  label={'View All'}
                  variant={'tertiary'}
                />
              </View>
              <FlatList
                horizontal
                data={cardData}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <CustomCard
                    variant={'small'}
                    onPress={handleCardPress}
                    title={item.title}
                    imageSource={item.imageSource}
                    mode={'elevated'}
                  />
                )}
              />
            </View>
            <View>
              <View style={styles.innerContainer}>
                <Typography
                  bgColor="black"
                  type="displayLarge"
                  size="large"
                  fontWeight="600">
                  {homeScreenContent.level4Qualification}
                </Typography>
                <CustomButton
                  onPress={handleViewAllPress}
                  label={'View All'}
                  variant={'typeD'}
                />
              </View>
              <FlatList
                horizontal
                data={cardTeamData}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}>
                    <CustomCard
                      variant={'medium'}
                      onPress={() => {
                        console.log('hello');
                      }}
                      title={item.title}
                      imageSource={item.imageSource}
                      mode={'elevated'}
                    />
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 5,
                      }}>
                      <Typography
                        bgColor={'black'}
                        type={'titleLarge'}
                        fontWeight="700"
                        size="large">
                        {item.title}
                      </Typography>
                      <Typography
                        bgColor={'black'}
                        type={'titleSmall'}
                        fontWeight="500"
                        size="small">
                        {item.occupation}
                      </Typography>
                    </View>
                  </View>
                )}
              />
            </View>
            <View>
              <View style={styles.innerContainer}>
                <Typography
                  bgColor="black"
                  type="displayLarge"
                  fontWeight="600"
                  size="large">
                  {homeScreenContent.ourStudentPortfolios}
                </Typography>
                <CustomButton
                  onPress={handleViewAllPress}
                  label={'View All'}
                  variant={'tertiary'}
                />
              </View>
              <FlatList
                horizontal
                data={cardPortfoliosData}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <CustomCard
                    variant={'large'}
                    onPress={() => {
                      console.log('hello');
                    }}
                    title={item.title}
                    imageSource={item.imageSource}
                    mode={'elevated'}
                  />
                )}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },

  // eslint-disable-next-line react-native/no-color-literals
  dotStyle: {
    backgroundColor: '#000000',
    borderRadius: 5,
    height: 5,
    width: 5,
  },

  imageCorouselStyle: {
    borderRadius: 15,
    height: windowWidth * 0.6,
    width: windowWidth - 40,
  },

  // eslint-disable-next-line react-native/no-color-literals
  inactiveDotStyle: {
    backgroundColor: '#D4D1D1',
    borderRadius: 5,
    height: 5,
    width: 5,
  },

  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  paginationContainerStyle: {paddingBottom: 10, paddingTop: 10},

  safeAreaContainer: {flex: 1},
});

export default HomeScreen;
