import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image} from 'expo-image';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {getHomeScreenStyles} from './styles';
import {Typography} from '../../../Components';
import {SheetManager} from 'react-native-actions-sheet';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNotifications} from '../../../CustomHooks/AppHooks/useNotifications';
import {type Model} from '@nozbe/watermelondb';
import {moderateScale} from '../../../Functions/StyleScale';
import {useProfile} from '../../../CustomHooks/AppHooks/useProfile';
import {getProfilePic} from '../../../Functions/GetProfilePic';
import content from '../../../Assets/Languages/english.json';
import ActiveChats from './ActiveChats';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  activeChats: Model[];
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {colors} = useTheme();
  const styles = getHomeScreenStyles(colors);
  useNotifications();

  const {profileSuccess} = useProfile();
  const openFullImage = () => {
    void SheetManager.show('ViewProfileImage-sheet', {
      payload: {
        imageUrl: getProfilePic(profileSuccess?.profilePic),
      },
    });
  };

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  const searchBar = () => (
    <TouchableOpacity
      style={styles.searchButtonContainer}
      onPress={async () => SheetManager.show('SearchFeature-sheet')}>
      <View style={styles.searchContainer}>
        <Typography
          fontWeight="400"
          bgColor={colors.textPrimaryColor}
          textStyle={styles.searchButtonTextStyle}>
          {content.HomeScreen.searchPlaceholder}
        </Typography>
      </View>
      <View style={styles.addButton}>
        <Icon name="add" size={20} color={colors.iconPrimaryColor} />
      </View>
    </TouchableOpacity>
  );

  const header = () => (
    <View style={styles.header}>
      <View style={styles.profileUsernameContainer}>
        <TouchableOpacity
          style={styles.profilePicContainer}
          onPress={openFullImage}>
          <Image
            source={{
              uri: getProfilePic(profileSuccess?.profilePic),
            }}
            style={styles.img}
            transition={500}
            cachePolicy={'memory-disk'}
          />
        </TouchableOpacity>
        <Typography
          bgColor="white"
          fontWeight="400"
          textStyle={styles.headerText}>
          {profileSuccess?.username}
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

  return (
    <View style={styles.container}>
      {header()}
      {searchBar()}

      <ActiveChats
        navigation={navigation}
        accountName={profileSuccess?.username ?? ''}
      />
    </View>
  );
};

export default HomeScreen;
