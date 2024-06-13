import React from 'react';
import {View, Image} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getUserProfileStyles} from './styles';
import {CustomButton, Typography} from '../../../Components';
import {baseURL} from '../../../Constants';
import {FlashList} from '@shopify/flash-list';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import Header from '../../../Components/Header';
import {moderateScale} from '../../../Functions/StyleScale';
import Entypo from 'react-native-vector-icons/Entypo';

type UserProfileProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

const UserProfile = ({navigation, route}: UserProfileProps) => {
  const {image, username, status, skills} = route.params;

  const {colors} = useTheme();
  const styles = getUserProfileStyles(colors);

  const renderSkills = ({item}) => {
    return (
      <Typography
        bgColor={colors.textPrimaryColor}
        fontWeight="300"
        textStyle={styles.skill}>
        {item}
      </Typography>
    );
  };

  return (
    <LinearGradient
      colors={['#868F96', '#596164']}
      style={styles.gradientContainer}>
      <View style={styles.headerContainer}>
        <Header />
        <Entypo
          name="block"
          size={moderateScale(30)}
          style={styles.blockIconStyle}
          color={colors.blockIconColor}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: `${baseURL}/${image}?${new Date()}`}}
            style={styles.profileImage}
          />
        </View>
        <Typography
          fontWeight="400"
          bgColor={colors.textPrimaryColor}
          textStyle={styles.nameText}>
          {username}
        </Typography>
        <Typography
          fontWeight="400"
          bgColor={colors.textPrimaryColor}
          textStyle={styles.statusText}>
          {status}
        </Typography>

        <View style={styles.skillContainer}>
          <FlashList
            estimatedItemSize={80}
            data={typeof skills === 'string' ? JSON.parse(skills) : skills}
            renderItem={renderSkills}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <StarRatingDisplay rating={5} />

        <View style={styles.feedbackButtonContainer}>
          <CustomButton
            label="Give Feedback"
            radius={95}
            viewStyle={styles.feedbackButtonStyle}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default UserProfile;
