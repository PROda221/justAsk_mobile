import {View, ScrollView, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {Typography} from '../../../Components';
import content from '../../../Assets/Languages/english.json';
import {type HomeScreenType} from '../../../Assets/Languages/englishTypes';
import {CustomCard} from '../../../Components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import Header from '../../../Components/Header';
import CardContainer from '../../../Components/CardContainer';
import {
  type StackParamList,
  type StackScreens,
} from '../../../Navigation/types';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

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

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, 'HomePage'>;
};

const Scroll = styled(ScrollView)`
  flex-grow: 1;
  padding: 0 8px 0 8px;
`;

const HomeScreen = ({navigation}: Props): JSX.Element => {
  const handleViewAllPress = (screen: StackScreens) => {
    navigation.navigate(screen);
  };

  const handleCardPress = (screen: StackScreens) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={homeScreenContent.headerTitle} drawer />
        <Scroll>
          <CardContainer
            fontColor="black"
            fontSize="large"
            fontWeight="700"
            buttonTitle={homeScreenContent.viewAll}
            title={homeScreenContent.onlineCourse}
            buttonVariant="typeD"
            buttonImg
            buttonOnPress={() => {
              handleViewAllPress('Online Courses');
            }}>
            <FlatList
              horizontal
              data={cardData}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <CustomCard
                  variant={'small'}
                  onPress={() => {
                    handleCardPress('Program Page');
                  }}
                  title={item.title}
                  imageSource={item.imageSource}
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
              handleViewAllPress('Online Courses');
            }}>
            <FlatList
              horizontal
              data={cardData}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <CustomCard
                  variant={'small'}
                  onPress={() => {
                    handleCardPress('Program Page');
                  }}
                  title={item.title}
                  imageSource={item.imageSource}
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
              handleViewAllPress('Online Courses');
            }}>
            <FlatList
              horizontal
              data={cardData}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <CustomCard
                  variant={'small'}
                  onPress={() => {
                    handleCardPress('Program Page');
                  }}
                  title={item.title}
                  imageSource={item.imageSource}
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
              handleViewAllPress('Online Courses');
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
              handleViewAllPress('Online Courses');
            }}>
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
                />
              )}
            />
          </CardContainer>
        </Scroll>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1},
});

export default HomeScreen;
