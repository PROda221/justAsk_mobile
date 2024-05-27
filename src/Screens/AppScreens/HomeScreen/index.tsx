import React, {useCallback, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {getHomeScreenStyles} from './styles';
import {Typography} from '../../../Components';
import {SheetManager} from 'react-native-actions-sheet';
import {baseURL} from '../../../Constants';
import {useGetOnline} from './CustomHooks/useGetOnline';
import {getAllChats} from '../../../DB/DBFunctions';
import {useSelector} from 'react-redux';
import {RootState} from '../../../Redux/rootReducers';
import {FlashList} from '@shopify/flash-list';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {formatTimestamp} from '../../../Functions/FormatTime';
import {ParamListBase, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const HomeScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const styles = getHomeScreenStyles(colors);
  const [activeChats, setActiveChats] = useState<_RawRecord[]>([]);

  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const {socket} = useGetOnline();

  useFocusEffect(
    useCallback(() => {
      const fetchAllChatsFromDb = async () => {
        const allChats = await getAllChats();
        console.log('flashlist data')
        setActiveChats(allChats);
      };

      fetchAllChatsFromDb();
    }, [socket]),
  );

  const openChatScreen = (item) => {
    navigation.navigate('ChatScreen', {
      username: item.username,
      image: item.profile_pic,
      socket,
      status: '',
      skills: '',
    });
  };

  const renderMessage = ({item}) => (
    <TouchableOpacity onPress={()=>openChatScreen(item)} style={styles.messageContainer}>
      <Image
        source={{uri: `${baseURL}/${item.profile_pic}?${Date.now()}`}}
        style={styles.avatar}
      />
      <View style={styles.messageTextContainer}>
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.messageName}>
          {item.username}
        </Typography>
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.messageText}>
          {item.lastMessage ? item.lastMessage : 'New Chat'}
        </Typography>
      </View>
      <Typography
        bgColor={colors.textPrimaryColor}
        fontWeight="400"
        textStyle={styles.messageTime}>
        {item.messageTime ? item.messageTime : formatTimestamp(item.created_at)}
      </Typography>
    </TouchableOpacity>
  );

  const searchBar = () => (
    <TouchableOpacity
      style={styles.searchButtonContainer}
      onPress={() =>
        SheetManager.show('SearchFeature-sheet', {payload: {socket}})
      }>
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
      <View style={styles.profilePicContainer}>
        <Image
          source={{
            uri: `${baseURL}/${profileSlice.success?.profilePic}?${new Date()}`,
          }}
          style={styles.img}
        />
      </View>
      <Typography
        bgColor="white"
        fontWeight="400"
        textStyle={styles.headerText}>
        {profileSlice.success?.username}
      </Typography>
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

export default HomeScreen;
