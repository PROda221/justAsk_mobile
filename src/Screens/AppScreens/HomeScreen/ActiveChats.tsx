import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image} from 'expo-image';
import {FlashList, type ListRenderItem} from '@shopify/flash-list';
import {Model} from '@nozbe/watermelondb';
import {Typography} from '../../../Components';
import {formatTimestamp} from '../../../Functions/FormatTime';
import {getProfilePic} from '../../../Functions/GetProfilePic';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getHomeScreenStyles} from './styles';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getUserChats} from '../../../DB/DBFunctions';
import {withObservables} from '@nozbe/watermelondb/react';

type ActiveChatsType = {
  _raw: _RawRecord;
};

type PropsType = {
  accountName?: string;
  navigation: NativeStackNavigationProp<ParamListBase>;
  activeChats: Model[] | null;
};

const enhance = withObservables(['accountName'], ({accountName}) => ({
  activeChats: getUserChats(accountName),
}));

const ActiveChats = ({activeChats, navigation}: PropsType) => {
  const {colors} = useTheme();
  const styles = getHomeScreenStyles(colors);

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

  return (
    <FlashList
      data={activeChats}
      renderItem={renderMessage}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.messagesList}
      estimatedItemSize={200}
    />
  );
};

export default enhance(ActiveChats);
