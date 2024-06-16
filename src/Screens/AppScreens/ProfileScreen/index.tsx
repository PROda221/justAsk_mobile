import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, TouchableOpacity} from 'react-native';
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
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import Entypo from 'react-native-vector-icons/Entypo';
import {useUserProfile} from './CustomHooks/useUserProfile';
import {Skeleton} from 'moti/skeleton';
import {SheetManager} from 'react-native-actions-sheet';

type UserProfileProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

const UserProfile = ({navigation, route}: UserProfileProps) => {
  const {image, username, status, skills} = route.params;
  const {
    userProfileSuccess,
    callGetUserProfileApi,
    resetUserProfileReducer,
    userProfileLoading,
  } = useUserProfile(username);

  const {colors} = useTheme();
  const styles = getUserProfileStyles(colors);

  useEffect(() => {
    callGetUserProfileApi();
  }, []);

  const openFullImage = () => {
    SheetManager.show('ViewProfileImage-sheet', {
      payload: {
        imageUrl: `${baseURL}/${userProfileSuccess?.profilePic || image}?${new Date()}`,
      },
    });
  };

  const openFeedback = () => {
    navigation.navigate('UserFeedback');
  };

  const handleBlock = () => {
    console.log('handle your block state here :');
  };

  const computeData = () => {
    if (userProfileSuccess?.adviceGenre) {
      return userProfileSuccess?.adviceGenre;
    } else if (typeof skills === 'string') {
      return JSON.parse(skills);
    } else {
      return skills;
    }
  };

  const renderSkills = ({item}) => {
    return (
      <Skeleton colorMode="light">
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="300"
          textStyle={styles.skill}>
          {item}
        </Typography>
      </Skeleton>
    );
  };

  return (
    <Skeleton.Group show={userProfileLoading}>
      <LinearGradient
        colors={['#868F96', '#596164']}
        style={styles.gradientContainer}>
        <View style={styles.headerContainer}>
          <Header onPress={resetUserProfileReducer} />
          <View style={styles.blockIconStyle}>
            <Skeleton colorMode="light">
              <Entypo
                name="block"
                size={moderateScale(30)}
                color={colors.blockIconColor}
                onPress={handleBlock}
              />
            </Skeleton>
          </View>
        </View>

        <View style={styles.container}>
          <Skeleton
            colorMode="light"
            height={verticalScale(165)}
            width={horizontalScale(165)}>
            <TouchableOpacity
              onPress={openFullImage}
              style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${baseURL}/${userProfileSuccess?.profilePic || image}?${new Date()}`,
                }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </Skeleton>

          <View style={{paddingTop: verticalScale(8)}}>
            <Skeleton colorMode="light">
              <Typography
                fontWeight="400"
                bgColor={colors.textPrimaryColor}
                textStyle={styles.nameText}>
                {userProfileSuccess?.username || username}
              </Typography>
            </Skeleton>
          </View>

          <View style={{paddingTop: verticalScale(11)}}>
            <Skeleton colorMode="light">
              <Typography
                fontWeight="400"
                bgColor={colors.textPrimaryColor}
                textStyle={styles.statusText}>
                {userProfileSuccess?.status || status}
              </Typography>
            </Skeleton>
          </View>

          <View style={styles.skillContainer}>
            <FlatList
              data={computeData()}
              renderItem={renderSkills}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {userProfileSuccess && userProfileSuccess.averageRating.length > 0 ? (
            <StarRatingDisplay
              rating={userProfileSuccess?.averageRating[0].averageStars}
            />
          ) : (
            <Typography
              textStyle={styles.statusText}
              bgColor={colors.textPrimaryColor}
              fontWeight="400">
              Be the first to rate!
            </Typography>
          )}

          <View style={styles.feedbackButtonContainer}>
            <Skeleton colorMode="light">
              <CustomButton
                onPress={openFeedback}
                label="Give Feedback"
                radius={95}
                viewStyle={styles.feedbackButtonStyle}
              />
            </Skeleton>
          </View>
        </View>
      </LinearGradient>
    </Skeleton.Group>
  );
};

export default UserProfile;
