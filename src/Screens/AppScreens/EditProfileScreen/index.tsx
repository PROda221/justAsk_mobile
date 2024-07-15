import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Image} from 'expo-image';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getEditProfileStyles} from './styles';
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
import {Skeleton} from 'moti/skeleton';
import {SheetManager} from 'react-native-actions-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useProfileUpload} from '../../../CustomHooks/AppHooks/useProfileUpload';
import {useProfile} from '../../../CustomHooks/AppHooks/useProfile';
import {getProfilePic} from '../../../Functions/GetProfilePic';
import {useImageColors} from '../../../CustomHooks/AppHooks/useImageColors';

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

  const {profileLoading, profileSuccess} = useProfile();
  const {imageColors} = useImageColors(
    getProfilePic(profileSuccess?.profilePic),
    newProfileValues.profileImg,
  );

  const {callProfileUploadApi, profileUploadLoading, profileUploadSuccess} =
    useProfileUpload();

  const {colors} = useTheme();
  const styles = getEditProfileStyles(colors);

  useEffect(() => {
    if (profileUploadSuccess) {
      setEditProfile(false);
    }
  }, [profileUploadSuccess]);

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

  const saveHandler = () => {
    if (newProfileValues.profileImg || newProfileValues.status) {
      let data = {
        filePath: newProfileValues.profileImg,
        status: newProfileValues.status,
      };
      callProfileUploadApi(data);
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

  const computeData = () => {
    if (profileSuccess?.adviceGenre) {
      return profileSuccess?.adviceGenre;
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

  const openFullImage = () => {
    SheetManager.show('ViewProfileImage-sheet', {
      payload: {
        imageUrl: getProfilePic(profileSuccess?.profilePic || image),
      },
    });
  };

  return (
    <Skeleton.Group show={profileLoading}>
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
                  uri: `${newProfileValues.profileImg ?? getProfilePic(profileSuccess?.profilePic ?? image)}`,
                }}
                style={styles.profileImage}
                transition={500}
                cachePolicy={'none'}
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
            </TouchableOpacity>
          </Skeleton>

          <View style={{paddingTop: verticalScale(8)}}>
            <Skeleton colorMode="light">
              <Typography
                fontWeight="400"
                bgColor={colors.textPrimaryColor}
                textStyle={styles.nameText}>
                {profileSuccess?.username || username}
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
                {newProfileValues.status ?? (profileSuccess?.status || status)}
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

          {profileSuccess && profileSuccess.averageRating.length > 0 ? (
            <StarRatingDisplay
              enableHalfStar={false}
              rating={profileSuccess?.averageRating[0].averageStars}
            />
          ) : (
            <StarRatingDisplay enableHalfStar={false} rating={0} />
          )}

          <View style={styles.feedbackButtonContainer}>
            {editProfile && (
              <Skeleton colorMode="light">
                <CustomButton
                  onPress={saveHandler}
                  label={'Save'}
                  loading={profileUploadLoading}
                  radius={95}
                  viewStyle={styles.feedbackSaveButtonStyle}
                />
              </Skeleton>
            )}

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
