import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Typography} from '../../../Components';
import {CustomCard} from '../../../Components';
import {
  SafeAreaProvider,
  SafeAreaView as SafeAreaViewCompat,
} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

const DetailsPage = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleCardPress = (programId: string) => {
    navigation.navigate('Program Page');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaViewCompat style={styles.safeAreaContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons name={'chevron-left'} size={25} color="black" />
          </TouchableOpacity>
          <Typography
            bgColor={'black'}
            type={'displayLarge'}
            size={'large'}
            fontWeight="600">
            {route.name}
          </Typography>
        </View>
        <View style={styles.container}>
          <FlatList
            data={cardData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <CustomCard
                  variant={'small'} // Or any other variant you want to use
                  onPress={handleCardPress}
                  title={item.title}
                  imageSource={item.imageSource}
                  mode={'elevated'}
                />

                <CustomCard
                  variant={'small'} // Or any other variant you want to use
                  onPress={handleCardPress}
                  title={item.title}
                  imageSource={item.imageSource}
                  mode={'elevated'}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
          />
        </View>
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
});

export default DetailsPage;
