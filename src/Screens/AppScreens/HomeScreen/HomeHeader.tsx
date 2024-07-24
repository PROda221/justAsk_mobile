import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Typography} from '../../../Components';
import {DEFAULT_IMAGE} from '../../../Functions/GetProfilePic';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';
import {HomeScreenStyles} from './styles';
import {withObservables} from '@nozbe/watermelondb/react';
import database from '../../../DB/database';
import {Model, Q} from '@nozbe/watermelondb';
import {Image} from 'expo-image';
import {SheetManager} from 'react-native-actions-sheet';
import {Skeleton} from 'moti/skeleton';

const enhance = withObservables(['username'], ({username}) => ({
  currentUser: database
    .get('users')
    .query(Q.where('username', username))
    .observeWithColumns(['profile_pic', 'status']),
}));

type Props = {
  styles: HomeScreenStyles;
  colors: DarkColors;
  username: string;
  openSettings: () => void;
  currentUser: Model[];
  loading: boolean;
};

const HomeHeader = ({
  styles,
  colors,
  username,
  openSettings,
  currentUser,
  loading,
}: Props) => {
  const openFullImage = () => {
    void SheetManager.show('ViewProfileImage-sheet', {
      payload: {
        imageUrl: currentUser[0]?._raw['profile_pic'] || DEFAULT_IMAGE,
      },
    });
  };

  return (
    <Skeleton.Group show={loading}>
      <View style={styles.header}>
        <View style={styles.profileUsernameContainer}>
          <Skeleton
            colorMode="light"
            width={horizontalScale(45)}
            height={verticalScale(45)}
            radius={moderateScale(22)}>
            <TouchableOpacity
              style={styles.profilePicContainer}
              onPress={openFullImage}>
              <Image
                source={{
                  uri: currentUser[0]?._raw['profile_pic'] || DEFAULT_IMAGE,
                }}
                style={styles.img}
                transition={500}
              />
            </TouchableOpacity>
          </Skeleton>
          <View style={{paddingLeft: horizontalScale(15)}}>
            <Skeleton colorMode="light" width={horizontalScale(150)}>
              <Typography
                bgColor="white"
                fontWeight="400"
                textStyle={styles.headerText}>
                {username}
              </Typography>
            </Skeleton>
          </View>
        </View>
        <Fontisto
          name="player-settings"
          size={moderateScale(20)}
          color={colors.settingsIcons}
          onPress={openSettings}
        />
      </View>
    </Skeleton.Group>
  );
};

export default enhance(HomeHeader);
