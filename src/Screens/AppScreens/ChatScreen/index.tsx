import {type ParamListBase, type RouteProp} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Alert} from 'react-native';
import {useStartChat} from '../../../CustomHooks/AppHooks/useStartChat';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getChatScreenStyles} from './styles';
import {verticalScale} from '../../../Functions/StyleScale';
import {TextInput} from '../../../Components';
import {useForm} from 'react-hook-form';
import {FlashList} from '@shopify/flash-list';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {
  type ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Image as Compress} from 'react-native-compressor';
import {useSocket} from '../../../useContexts/SocketContext';
import {getCurrentChatObservable, markAllRead} from '../../../DB/DBFunctions';
import {setInChatScreen} from '../../../Redux/Slices/LocalReducer';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {RenderMessageList} from './RenderMessageList';
import {useProfile} from '../../../CustomHooks/AppHooks/useProfile';
import {useUserProfile} from '../../../CustomHooks/AppHooks/useUserProfile';
import {withObservables} from '@nozbe/watermelondb/react';
import {Model} from '@nozbe/watermelondb';
import {YourBlockStatus} from './YourBlockStatus';
import ChatHeader from './ChatHeader';

type MessageType = {
  item: {
    id: string;
    text: string;
    type: 'image' | 'message';
    received: boolean;
    uploadingImage: boolean;
    createdAt: number;
  };
};
type Params = {
  params: {
    username: string;
    status: string;
    image: string;
    skills: string[];
    accountName: string;
  };
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<Params>;
  activeChat: Model[];
};

const enhance = withObservables(['route'], ({route}) => ({
  activeChat: getCurrentChatObservable(
    route.params?.accountName,
    route.params?.username,
  ),
}));

const ChatScreen = ({navigation, route, activeChat}: Props) => {
  const {username, skills, status, image} = route.params;
  const {callGetUserProfileApi} = useUserProfile(username, image);
  const {newMessage} = useSocket();
  const {getMessages, sendMessages, messages, partnerStatus, loadMoreMessages} =
    useStartChat(username, image, newMessage, skills, status);
  const {profileSuccess} = useProfile();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {control, getValues, resetField} = useForm();

  const [height, setHeight] = useState<number>(verticalScale(50));

  const position = useSharedValue(
    !activeChat[0]?._raw['got_blocked_status'] && partnerStatus === 'online'
      ? 0
      : 10,
  );
  const opacity = useSharedValue(
    !activeChat[0]?._raw['got_blocked_status'] && partnerStatus === 'online'
      ? 1
      : 0,
  );

  const flashListRef = useRef(null);

  const {colors} = useTheme();

  const styles = getChatScreenStyles(colors);
  useEffect(() => {
    markAllRead(username, profileSuccess?.username);
    dispatch(setInChatScreen(isFocused));
    return () => {
      dispatch(setInChatScreen(false));
    };
  }, [isFocused]);

  useEffect(() => {
    callGetUserProfileApi();
  }, []);

  // Handle animation of online status
  useEffect(() => {
    if (
      !activeChat[0]?._raw['got_blocked_status'] &&
      partnerStatus === 'online'
    ) {
      // Move the username up first then appear the status
      position.value = withTiming(0, {duration: 500});
      opacity.value = withDelay(500, withTiming(1, {duration: 500}));
    } else {
      // Fade out the status first then move the username down
      opacity.value = withTiming(0, {duration: 500}, () => {
        position.value = withTiming(10, {duration: 500});
      });
    }
  }, [partnerStatus, activeChat[0]?._raw['got_blocked_status']]);

  // Create animation styles of online status
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: position.value}],
  }));

  const statusStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sendMessage = async () => {
    if (activeChat[0]?._raw['you_blocked_status']) {
      Alert.alert('You have blocked this user. Unblock to chat');
      return;
    }
    if (getValues('chattext')) {
      const msg = getValues('chattext');
      resetField('chattext');
      getMessages(msg, false, 'message');
      sendMessages(msg, username, 'message');
    }
  };

  const handleImageSelection = async () => {
    if (activeChat[0]?._raw['you_blocked_status']) {
      Alert.alert('You have blocked this user. Unblock to chat');
      return;
    }
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.5,
      // includeBase64: true
    };

    try {
      const result = await launchImageLibrary(options);
      const uri = result.assets?.[0].uri;
      const compressedResult = await Compress.compress(`${uri}`);
      await getMessages(
        {url: compressedResult, uploading: true},
        false,
        'image',
      );
    } catch (err) {
      console.log('err at image selection :', err);
    }
  };

  const openUserProfle = () => {
    if (activeChat[0]?._raw['got_blocked_status']) {
      Alert.alert('You have been blocked by the user');
      return;
    }
    navigation.navigate('UserProfile', {
      username,
      skills,
      status,
      image,
      accountName: profileSuccess?.username,
    });
  };

  return (
    <View style={styles.container}>
      <ChatHeader
        styles={styles}
        colors={colors}
        username={username}
        animatedStyle={animatedStyle}
        statusStyle={statusStyle}
        image={image}
        accountName={profileSuccess?.username}
        openUserProfle={openUserProfle}
      />

      <FlashList
        data={messages}
        showsVerticalScrollIndicator={false}
        ref={flashListRef}
        renderItem={({item}: MessageType) => (
          <RenderMessageList
            username={username}
            account={profileSuccess?.username}
            id={item.id}
            text={item.text}
            type={item.type}
            uploadingImage={item.uploadingImage}
            received={item.received}
            createdAt={item.createdAt}
            sendMessages={sendMessages}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        estimatedItemSize={300}
        inverted
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        extraData={[
          activeChat[0]?._raw['you_blocked_status'],
          activeChat[0]?._raw['got_blocked_status'],
        ]}
        // OnLoad={scrollToBottom}
      />

      <YourBlockStatus
        show={activeChat[0]?._raw['you_blocked_status']}
        username={username}
      />

      <View style={styles.inputContainer}>
        <TextInput
          viewStyle={[
            styles.chatTextInput,
            {height: height < verticalScale(50) ? verticalScale(50) : height},
          ]}
          name="chattext"
          secureTextEntry={false}
          control={control}
          label="Write"
          placeholder={
            activeChat[0]?._raw['got_blocked_status']
              ? 'Chat Blocked'
              : 'Write...'
          }
          leftIcon={
            activeChat[0]?._raw['got_blocked_status'] ? 'block' : 'gallary'
          }
          rightIcon="chat"
          handleRightIconPress={sendMessage}
          {...(!activeChat[0]?._raw['got_blocked_status'] && {
            handleLeftIconPress: handleImageSelection,
          })}
          multiline={true}
          editable={!activeChat[0]?._raw['got_blocked_status']}
          onContentSizeChange={event => {
            setHeight(event.nativeEvent.contentSize.height);
          }}
        />
      </View>
    </View>
  );
};

export default enhance(ChatScreen);
