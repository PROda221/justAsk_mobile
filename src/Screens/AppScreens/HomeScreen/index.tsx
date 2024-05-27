import React, {useEffect, useState} from 'react';
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

const HomeScreen = () => {
  const {colors} = useTheme();
  const styles = getHomeScreenStyles(colors);
  const [activeChats, setActiveChats] = useState<_RawRecord[]>([]);

  useEffect(() => {
    const fetchAllChatsFromDb = async () => {
      const allChats = await getAllChats();
      console.log('all chats are :', allChats);
      setActiveChats(allChats);
    };

    fetchAllChatsFromDb();
  }, []);

  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const {socket} = useGetOnline();

  const renderMessage = ({item}) => (
    <View style={styles.messageContainer}>
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
          {'item.message'}
        </Typography>
      </View>
      <Typography
        bgColor={colors.textPrimaryColor}
        fontWeight="400"
        textStyle={styles.messageTime}>
        {item.created_at}
      </Typography>
    </View>
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
