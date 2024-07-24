import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Typography} from '../../../Components';
import {DEFAULT_IMAGE} from '../../../Functions/GetProfilePic';
import {moderateScale} from '../../../Functions/StyleScale';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';
import {HomeScreenStyles} from './styles';
import {withObservables} from '@nozbe/watermelondb/react';
import database from '../../../DB/database';
import {Model, Q} from '@nozbe/watermelondb';
import {Image} from 'expo-image';
import {SheetManager} from 'react-native-actions-sheet';

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
};

const HomeHeader = ({
  styles,
  colors,
  username,
  openSettings,
  currentUser,
}: Props) => {
  const openFullImage = () => {
    void SheetManager.show('ViewProfileImage-sheet', {
      payload: {
        imageUrl: currentUser[0]?._raw['profile_pic'] || DEFAULT_IMAGE,
      },
    });
  };

  return (
    <View style={styles.header}>
      <View style={styles.profileUsernameContainer}>
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
        <Typography
          bgColor="white"
          fontWeight="400"
          textStyle={styles.headerText}>
          {username}
        </Typography>
      </View>
      <Fontisto
        name="player-settings"
        size={moderateScale(20)}
        color={colors.settingsIcons}
        onPress={openSettings}
      />
    </View>
  );
};

export default enhance(HomeHeader);
