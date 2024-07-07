import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {getHomeScreenStyles} from './styles';
import {Typography} from '../../../Components';
import {SheetManager} from 'react-native-actions-sheet';
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
import content from '../../../Assets/Languages/english.json';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  activeChats: Model[];
};

type ActiveChatsType = {
  _raw: _RawRecord;
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  activeChats: Model[];
};

const HomeScreen = ({navigation, activeChats}: HomeScreenProps) => {
  const {colors} = useTheme();
  const styles = getHomeScreenStyles(colors);
  useNotifications();

  const {profileSuccess} = useProfile();

  const openChatScreen = (item: ActiveChatsType) => {
    navigation.navigate('ChatScreen', {
      username: item._raw['username'],
      image: item._raw['profile_pic'],
      status: item._raw['status'],
      skills: item._raw['skills'],
    });
  };

  const renderMessage: ListRenderItem<Model> = ({
    item,
  }: {
    item: ActiveChatsType;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => openChatScreen(item)}
        style={styles.messageContainer}>
        <Image
          source={{uri: getProfilePic(item._raw['profile_pic'])}}
          style={styles.avatar}
        />
        <View style={styles.messageTextContainer}>
          <Typography
            bgColor={colors.textPrimaryColor}
            fontWeight="400"
            textStyle={styles.messageName}>
            {item._raw['username']}
          </Typography>
          <Typography
            bgColor={colors.textPrimaryColor}
            fontWeight="400"
            textStyle={styles.messageText}>
            {item._raw['last_message'] ? item._raw['last_message'] : 'New Chat'}
          </Typography>
        </View>
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.messageTime}>
          {formatTimestamp(item._raw['updated_at'])}
        </Typography>
      </TouchableOpacity>
    );
  };

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

const enhance = withObservables(['activeChats'], ({navigation}: Props) => ({
  activeChats: database
    .get('chats')
    .query()
    .observeWithColumns(['last_message', 'message_time']),
}));
const EnhancedHomeScreen = enhance(HomeScreen);
export default EnhancedHomeScreen;
