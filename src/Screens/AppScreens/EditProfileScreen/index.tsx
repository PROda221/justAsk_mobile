import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getEditProfileStyles} from './styles';
import {CustomButton, Typography} from '../../../Components';
import {baseURL} from '../../../Constants';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type UserProfileProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

type NewProfileType = {
  profileImg: string | null;
  status: string | null;
};

const EditProfileScreen = ({navigation, route}: UserProfileProps) => {
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [newProfileValues, setNewProfileValues] = useState<NewProfileType>({
    profileImg: null,
    status: null,
  });
  const {image = '', username = '', status = '', skills = []} = route.params;

  const {
    userProfileSuccess,
    callGetUserProfileApi,
    resetUserProfileReducer,
    userProfileLoading,
  } = useUserProfile(username);

  const {colors} = useTheme();
  const styles = getEditProfileStyles(colors);

  useEffect(() => {
    callGetUserProfileApi();
  }, []);

  const changeProfileImg = async () => {
    let filePath = await SheetManager.show('AddProfileImage-sheet');
    if (filePath) {
      setNewProfileValues(prev => ({...prev, profileImg: filePath}));
    }
  };

  const changeStatus = async () => {
    let status = await SheetManager.show('AddUserStatus-sheet');
    if (status) {
      setNewProfileValues(prev => ({...prev, status}));
    }
  };

  const editProfileHandler = () => {
    if (editProfile) {
      cancelEdit();
    } else {
      setEditProfile(prev => !prev);
    }
  };

  const cancelEdit = () => {
    setNewProfileValues(prev => ({...prev, profileImg: null, status: null}));
    setEditProfile(false);
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

  const statusEditComponent = () => {
    return (
      <TouchableOpacity style={styles.statusEditStyle} onPress={changeStatus}>
        <MaterialIcons
          name="edit"
          size={moderateScale(14)}
          color={colors.editProfileButtonBgColor}
        />
      </TouchableOpacity>
    );
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
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${newProfileValues.profileImg ?? `${baseURL}/${userProfileSuccess?.profilePic ?? image}`}`,
                }}
                style={styles.profileImage}
              />
              {editProfile && (
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={changeProfileImg}>
                  <MaterialIcons
                    name="edit"
                    size={moderateScale(20)}
                    color={colors.editProfileButtonBgColor}
                  />
                </TouchableOpacity>
              )}
            </View>
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

          <View
            style={{
              paddingTop: verticalScale(2),
            }}>
            <Skeleton colorMode="light">
              <Typography
                fontWeight="400"
                bgColor={colors.textPrimaryColor}
                textStyle={[
                  styles.statusText,
                  {
                    paddingLeft: editProfile ? horizontalScale(10) : 0,
                    maxWidth: editProfile ? '90%' : '100%',
                  },
                ]}
                component={editProfile ? statusEditComponent : undefined}>
                {newProfileValues.status ??
                  (userProfileSuccess?.status || status)}
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
              enableHalfStar={false}
              rating={userProfileSuccess?.averageRating[0].averageStars}
            />
          ) : (
            <StarRatingDisplay enableHalfStar={false} rating={0} />
          )}

          <View style={styles.feedbackButtonContainer}>
            <Skeleton colorMode="light">
              <CustomButton
                onPress={editProfileHandler}
                label={editProfile ? 'Cancel' : 'Edit Profile'}
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

export default EditProfileScreen;
