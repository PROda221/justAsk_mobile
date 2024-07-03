import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {getHomeScreenStyles} from './styles';
import {Typography} from '../../../Components';
import {SheetManager} from 'react-native-actions-sheet';
import {baseURL} from '../../../Constants';
import {FlashList, type ListRenderItem} from '@shopify/flash-list';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {formatTimestamp} from '../../../Functions/FormatTime';
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNotifications} from '../../../CustomHooks/AppHooks/useNotifications';
import {withObservables} from '@nozbe/watermelondb/react';
import database from '../../../DB/database';
import {type Model} from '@nozbe/watermelondb';
import {moderateScale} from '../../../Functions/StyleScale';
import {useProfile} from '../../../CustomHooks/AppHooks/useProfile';
import {getProfilePic} from '../../../Functions/GetProfilePic';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  activeChats: Model[];
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const HomeScreen = ({navigation, activeChats}: HomeScreenProps) => {
  const {colors} = useTheme();
  const styles = getHomeScreenStyles(colors);
  useNotifications();

  const {profileSuccess} = useProfile();

  const openChatScreen = item => {
    navigation.navigate('ChatScreen', {
      username: item.username,
      image: item.profile_pic,
      status: item.status,
      skills: item.skills,
    });
  };

  const renderMessage: ListRenderItem<Model> = ({item}) => (
    <TouchableOpacity
      onPress={() => openChatScreen(item._raw)}
      style={styles.messageContainer}>
      <Image
        source={{uri: getProfilePic(item._raw.profile_pic)}}
        style={styles.avatar}
      />
      <View style={styles.messageTextContainer}>
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.messageName}>
          {item._raw.username}
        </Typography>
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.messageText}>
          {item._raw.lastMessage ? item._raw.lastMessage : 'New Chat'}
        </Typography>
      </View>
      <Typography
        bgColor={colors.textPrimaryColor}
        fontWeight="400"
        textStyle={styles.messageTime}>
        {item._raw.messageTime
          ? item._raw.messageTime
          : formatTimestamp(item._raw.created_at)}
      </Typography>
    </TouchableOpacity>
  );

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
          {'Search....'}
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

      <FlashList
        data={activeChats}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        estimatedItemSize={200}
      />
    </View>
  );
};

const enhance = withObservables([], ({navigation}: Props) => ({
  activeChats: database.collections.get('chats').query(), // shortcut syntax for `comment: comment.observe()`
}));
const EnhancedHomeScreen = enhance(HomeScreen);
export default EnhancedHomeScreen;
