import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getUserCardStyles} from './styles';
import {Typography} from '../Typography';
import {FlashList} from 'react-native-actions-sheet/dist/src/views/FlashList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Functions/StyleScale';

export const UserCard = ({username, skills, status, image}) => {
  const {colors} = useTheme();
  const styles = getUserCardStyles(colors);
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Typography
          bgColor="white"
          fontWeight="400"
          textStyle={styles.username}>
          {username}
        </Typography>
        <Typography bgColor="white" fontWeight="400" textStyle={styles.status}>
          {status}
        </Typography>
        <FlashList
          estimatedItemSize={80}
          data={skills}
          renderItem={({item}) => (
            <Typography fontWeight="300" textStyle={styles.skill}>
              {item}
            </Typography>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <AntDesign
        name="arrowright"
        color={'white'}
        size={moderateScale(20)}
        style={{height: verticalScale(20), paddingRight: horizontalScale(5)}}
      />
    </View>
  );
};
