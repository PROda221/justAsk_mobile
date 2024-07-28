import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Image} from 'expo-image';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getUserProfileStyles} from './styles';
import {CustomButton, Typography} from '../../../Components';
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
import {useUserProfile} from '../../../CustomHooks/AppHooks/useUserProfile';
import {Skeleton} from 'moti/skeleton';
import {SheetManager} from 'react-native-actions-sheet';
import {useImageColors} from '../../../CustomHooks/AppHooks/useImageColors';
import content from '../../../Assets/Languages/english.json';
import {withObservables} from '@nozbe/watermelondb/react';
import {getCurrentChatObservable} from '../../../DB/DBFunctions';
import {Model} from '@nozbe/watermelondb';

type Params = {
  params: {
    username: string;
    status: string;
    image: string;
    accountName: string;
    skills: string[] | string;
  };
};

type UserProfileProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<Params>;
  chatDetails: Model[] | [];
};

const enhance = withObservables(['route'], ({route}) => ({
  chatDetails: getCurrentChatObservable(
    route.params?.accountName,
    route.params?.username,
  ),
}));

const UserProfile = ({navigation, route, chatDetails}: UserProfileProps) => {
  const [loading, setLoading] = useState(true);
  const {username, status, skills, accountName} = route.params;
  const {userProfileSuccess, userProfileLoading} = useUserProfile(username);
  const {imageColors} = useImageColors(chatDetails[0]._raw?.['profile_pic']);

  const {colors} = useTheme();
  const styles = getUserProfileStyles(colors);

  useEffect(() => {
    setLoading(false);
  }, []);

  const openFullImage = () => {
    if (chatDetails[0]._raw?.['profile_pic']) {
      SheetManager.show('ViewProfileImage-sheet', {
        payload: {
          imageUrl: chatDetails[0]._raw?.['profile_pic'],
        },
      });
    }
  };

  const openFeedback = () => {
    navigation.navigate('UserFeedback', {
      accountName: accountName,
      username: username,
    });
  };

  const handleBlock = () => {
    console.log('handle your block state here :');
  };

  const computeData = () => {
    if (userProfileSuccess?.adviceGenre) {
      return userProfileSuccess?.adviceGenre;
    } else if (typeof skills === 'string' && skills.length) {
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
    <Skeleton.Group show={userProfileLoading || loading}>
      <LinearGradient
        colors={[
          imageColors?.primary ?? '#000',
          imageColors?.secondary ?? '#000',
        ]}
        locations={[0.0, 0.6]}
        useAngle
        style={styles.gradientContainer}>
        <View style={styles.headerContainer}>
          <Header />
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
                  uri: chatDetails[0]._raw?.['profile_pic'],
                }}
                transition={500}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </Skeleton>

          <View style={styles.usernameContainer}>
            <Skeleton colorMode="light">
              <Typography
                fontWeight="400"
                bgColor={colors.textPrimaryColor}
                textStyle={styles.nameText}>
                {userProfileSuccess?.username || username}
              </Typography>
            </Skeleton>
          </View>

          <View style={styles.statusContainer}>
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
          <View style={styles.feedbackContainer}>
            <Skeleton
              colorMode="light"
              height={verticalScale(20)}
              width={'100%'}>
              {userProfileSuccess &&
              userProfileSuccess.averageRating.length > 0 ? (
                <StarRatingDisplay
                  style={styles.feedbackStarsStyle}
                  enableHalfStar={false}
                  rating={userProfileSuccess?.averageRating[0].averageStars}
                />
              ) : (
                <Typography
                  textStyle={styles.noFeedbackText}
                  bgColor={colors.textPrimaryColor}
                  fontWeight="400">
                  {content.UserProfile.noFeedbackText}
                </Typography>
              )}
            </Skeleton>
          </View>

          <View style={styles.feedbackButtonContainer}>
            <Skeleton colorMode="light">
              <CustomButton
                onPress={openFeedback}
                label={content.UserProfile.feedbackButton}
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

export default enhance(UserProfile);
