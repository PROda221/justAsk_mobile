 
import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {CustomCard} from '../../../Components';
import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaViewCompat,
} from 'react-native-safe-area-context';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type StackParamList } from '../../../Navigation/types';
import Header from '../../../Components/Header';
import { type OnlineCourses } from '../../../Assets/Languages/englishTypes';
import content from '../../../Assets/Languages/english.json'
import styled from 'styled-components/native';
import { horizontalScale } from '../../../Functions/StyleScale';

type CardData = {
  id: string;
  title: string;
  imageSource: {uri: string};
};

type PropsType = {
  navigation: NativeStackNavigationProp<StackParamList, 'Online Courses'>;
}

const cardData: CardData[] = [
  {id: '1', title: 'Card 1', imageSource: {uri: 'https://picsum.photos/700'}},
  {id: '2', title: 'Card 2', imageSource: {uri: 'https://picsum.photos/701'}},
  {id: '3', title: 'Card 3', imageSource: {uri: 'https://picsum.photos/702'}},
  {id: '4', title: 'Card 4', imageSource: {uri: 'https://picsum.photos/703'}},
];

const Row = styled(View)`
  flex-direction: row;
`

const onlineCoursesScreen: OnlineCourses = content.onlineCourses;

const OnlineCoursesScreen = ({navigation}: PropsType): JSX.Element => {

  const handleCardPress = () => {
    navigation.navigate('Program Page');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaViewCompat style={styles.safeAreaContainer}>
        <Header title={onlineCoursesScreen.title} />
          <FlatList
            style={styles.listPadding}
            data={cardData}
            keyExtractor={item=> item.id}
            renderItem={({item}) => (
              <Row>
                <CustomCard
                  variant={'small'} 
                  onPress={handleCardPress}
                  title={item.title}
                  imageSource={item.imageSource}
                />

                <CustomCard
                  variant={'small'} 
                  onPress={handleCardPress}
                  title={item.title}
                  imageSource={item.imageSource}
                />
              </Row>
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
