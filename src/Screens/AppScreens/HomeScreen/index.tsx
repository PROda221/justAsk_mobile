import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {getHomeScreenStyles} from './styles';
import {Typography} from '../../../Components';
import {SheetManager} from 'react-native-actions-sheet';
import {baseURL} from '../../../Constants';
import {useSelector} from 'react-redux';
import {RootState} from '../../../Redux/rootReducers';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {formatTimestamp} from '../../../Functions/FormatTime';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNotifications} from '../../../CustomHooks/AppHooks/useNotifications';
import {withObservables} from '@nozbe/watermelondb/react';
import database from '../../../DB/database';
import {Model} from '@nozbe/watermelondb';
import {moderateScale} from '../../../Functions/StyleScale';

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

  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const openChatScreen = item => {
    navigation.navigate('ChatScreen', {
      username: item.username,
      image: item.profile_pic,
      status: item.status,
      skills: item.skills,
    });
  };

  const renderMessage: ListRenderItem<Model> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => openChatScreen(item._raw)}
        style={styles.messageContainer}>
        <Image
          source={{uri: `${baseURL}/${item._raw.profile_pic}?${Date.now()}`}}
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
  };

  const openFullImage = () => {
    SheetManager.show('ViewProfileImage-sheet', {
      payload: {
        imageUrl: `${baseURL}/${profileSlice.success?.profilePic}`,
      },
    });
  };

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  const searchBar = () => (
    <TouchableOpacity
      style={styles.searchButtonContainer}
      onPress={() => SheetManager.show('SearchFeature-sheet')}>
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
              uri: `${baseURL}/${profileSlice.success?.profilePic}?${new Date()}`,
            }}
            style={styles.img}
          />
        </TouchableOpacity>
        <Typography
          bgColor="white"
          fontWeight="400"
          textStyle={styles.headerText}>
          {profileSlice.success?.username}
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
