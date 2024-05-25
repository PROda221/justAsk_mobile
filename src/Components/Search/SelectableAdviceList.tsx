import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSheetRouteParams, useSheetRouter} from 'react-native-actions-sheet';
import {ScrollView} from 'react-native-actions-sheet';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getAdviceListStyles} from './AdviceListStyle';
import {Typography} from '../Typography';
import Header from '../Header';
import {allGenres} from '../../Constants';
import { useSearch } from '../../Screens/AppScreens/HomeScreen/CustomHooks/useSearch';

interface SelectableAdviceListProps {
  items: string[];
}

const SelectableAdviceList: React.FC<SelectableAdviceListProps> = () => {
  const {setSearchedGenres, searchedGenres} = useSearch()
  const [selectedGenres, setSelectedGenres] = useState<string[]>(searchedGenres)
  const router = useSheetRouter('SearchFeature-sheet');
  const {colors} = useTheme();
  const styles = getAdviceListStyles(colors);

  const toggleItem = (item: string) => {
    const updatedSelectedItems = selectedGenres.includes(item)
      ? selectedGenres.filter(i => i !== item)
      : [...selectedGenres, item];

      setSelectedGenres(updatedSelectedItems)
    // setSearchedGenres(updatedSelectedItems)
  };

  return (
    <View style={styles.main}>
      <View style={styles.headerContainer}>
        <Header containerStyle={styles.headerStyle} navigation={router} onPress={()=> setSearchedGenres(selectedGenres)} />

        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.subTitle}>
          {'Select topics you want to talk in'}
        </Typography>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {allGenres.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cell,
              selectedGenres.includes(item)
                ? styles.selected
                : styles.unselected,
            ]}
            onPress={() => toggleItem(item)}>
            <Typography
              fontWeight="400"
              bgColor={colors.textPrimaryColor}
              textStyle={styles.icon}>
              {selectedGenres.includes(item) ? '✔️' : '❌'}
            </Typography>
            <Typography
              fontWeight="400"
              bgColor={colors.textPrimaryColor}
              textStyle={styles.itemName}>
              {item}
            </Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectableAdviceList;
