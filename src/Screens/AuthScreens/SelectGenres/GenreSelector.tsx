import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../useContexts/Theme/ThemeContext';
import { getGenreSelectorStyles } from './GenreSelectorStyle';
import { Typography } from '../../../Components';


type Props = {
    genres: Array<string>
    getSelectedValues: (genre:Array<string>) => void
}

const GenreSelector = ({ genres, getSelectedValues }: Props) => {
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);  

  const {colors} = useTheme()
  const styles = getGenreSelectorStyles(colors)

  useEffect(() => {
    if(selectedGenres.length === 3){
        getSelectedValues(selectedGenres)
    }
  }, [selectedGenres])

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 3) {
        setSelectedGenres([...selectedGenres, genre]);
      } else {
        // Only allow 3 genres to be selected
        alert('You can only select up to 3 genres.');
      }
  };

  return (
    <View style={styles.container}>
      {genres.map((genre, index) => (
        <TouchableOpacity
          key={index}
          style={
            styles.genreContainer}
          onPress={() => toggleGenre(genre)}
        >
          <View style={[styles.genre, selectedGenres.includes(genre) && styles.selectedGenre,]}>
            {/* Insert your genre images here */}
            <Typography bgColor={colors.textPrimaryColor} fontWeight='400' textStyle={styles.genreText}>{genre}</Typography>
          </View>
          {/* Below comment is where names come */}
          {/* <Typography fontWeight='400' bgColor={colors.textPrimaryColor} textStyle={styles.genreName}>{genre}</Typography> */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GenreSelector;
