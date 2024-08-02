import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSheetRouter} from 'react-native-actions-sheet';
import {ScrollView} from 'react-native-actions-sheet';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getAdviceListStyles} from './AdviceListStyle';
import {Typography} from '../Typography';
import Header from '../Header';
import {allGenres} from '../../Constants';
import {useSearch} from '../../CustomHooks/AppHooks/useSearch';
import {CustomButton} from '../CustomButton';
import content from '../../Assets/Languages/english.json';

interface SelectableAdviceListProps {
  items: string[];
}

const SelectableAdviceList: React.FC<SelectableAdviceListProps> = () => {
  const {setSearchedGenres, searchedGenres} = useSearch();
  const [selectedGenres, setSelectedGenres] =
    useState<string[]>(searchedGenres);
  const router = useSheetRouter('SearchFeature-sheet');
  const {colors} = useTheme();
  const styles = getAdviceListStyles(colors, selectedGenres);

  const toggleItem = (item: string) => {
    const updatedSelectedItems = selectedGenres.includes(item)
      ? selectedGenres.filter(i => i !== item)
      : [...selectedGenres, item];

    setSelectedGenres(updatedSelectedItems);
    // setSearchedGenres(updatedSelectedItems)
  };

  return (
    <View style={styles.main}>
      <View style={styles.headerContainer}>
        <Header
          containerStyle={styles.headerStyle}
          navigation={router}
          onPress={() => setSearchedGenres(selectedGenres)}
        />

        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.subTitle}>
          {content.SearchFeature.SelectGenreHeading}
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
              {selectedGenres.includes(item) ? '✔️' : ''}
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
      <CustomButton
        onPress={() => {
          setSearchedGenres(selectedGenres);
          router?.goBack();
        }}
        label="Confirm"
        disabled={selectedGenres.length === 0}
        radius={14}
        viewStyle={styles.confirmButton}
      />
    </View>
  );
};

export default SelectableAdviceList;
