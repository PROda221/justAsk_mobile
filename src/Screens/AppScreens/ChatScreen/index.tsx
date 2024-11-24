import {useStartChat} from '../../../CustomHooks/AppHooks/useStartChat';
import React, {useEffect, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getChatScreenStyles} from './styles';
import {TextInput, Typography} from '../../../Components';
import {useForm} from 'react-hook-form';
import {FlashList} from '@shopify/flash-list';
import Animated, {
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
import {
  setInChatScreen,
  setReplyMsgId,
} from '../../../Redux/Slices/LocalReducer';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import RenderMessageList from './RenderMessageList';
import {useProfile} from '../../../CustomHooks/AppHooks/useProfile';
import {useUserProfile} from '../../../CustomHooks/AppHooks/useUserProfile';
import {withObservables} from '@nozbe/watermelondb/react';
import {YourBlockStatus} from './YourBlockStatus';
import ChatHeader from './ChatHeader';
import content from '../../../Assets/Languages/english.json';
import {hideAlertBox, showAlertBox} from '../../../Functions/ShowHideAlert';
import {forwardMsgType, MessageType, Props} from './types';
import {Model} from '@nozbe/watermelondb';
import {sendReadReceipt} from '../../../Functions/SendReadReceipt';
import {moderateScale} from '../../../Functions/StyleScale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SheetManager} from 'react-native-actions-sheet';
import {RootState} from '../../../Redux/rootReducers';

const enhance = withObservables(['route'], ({route}) => ({
  activeChat: getCurrentChatObservable(
    route.params?.accountName,
    route.params?.username,
  ),
}));

const ChatScreen = ({navigation, route, activeChat}: Props) => {
  const {username, skills, status, image} = route.params;

  const flashListRef = useRef<FlashList<MessageType> | null>(null);
  const findMoreMessages = useRef<number>(0);

  const [forwardMsg, setForwardMsg] = useState<forwardMsgType | undefined>();
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const {callGetUserProfileApi, userProfileSuccess} = useUserProfile(
    username,
    image,
  );
  const {newMessage, socket} = useSocket();
  const {getMessages, sendMessages, messages, partnerStatus, loadMoreMessages} =
    useStartChat(username, image, newMessage, skills, status);

  const {profileSuccess} = useProfile();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const scrollToBottom = () => {
    if (flashListRef.current) {
      flashListRef.current.scrollToOffset({animated: false, offset: 0});
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = event.nativeEvent;
    const isAtBottom = contentOffset.y <= 80;
    if (!isAtBottom !== showScrollButton) {
      setShowScrollButton(!isAtBottom);
    }
  };

  const replyMsg = useSelector(
    (state: RootState) => state.localReducer.replyMsg,
  );

  const closeChat = () => {
    if (
      activeChat[0]?._raw['got_blocked_status'] ||
      activeChat[0]?._raw['deactivated']
    ) {
      return true;
    }
    return false;
  };

  const {control, getValues, resetField} = useForm();

  // const [height, setHeight] = useState<number>(verticalScale(50));

  const position = useSharedValue(
    !closeChat() && partnerStatus === 'online' ? 0 : 10,
  );
  const opacity = useSharedValue(
    !closeChat() && partnerStatus === 'online' ? 1 : 0,
  );

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

  useEffect(() => {
    const showRepliedMessage = async () => {
      if (replyMsg.replyMsgId) {
        const relativeIndex = messages
          .slice(replyMsg.mainMsgIndex)
          .findIndex(message => message._raw['msg_id'] === replyMsg.replyMsgId);

        if (relativeIndex !== -1) {
          const index = relativeIndex + replyMsg.mainMsgIndex;
          flashListRef.current?.scrollToIndex({index, animated: true});
          dispatch(setReplyMsgId({replyMsgId: '', mainMsgIndex: 0}));
        } else {
          loadMoreMessages();
          findMoreMessages.current = findMoreMessages.current + 1;
        }
      }
    };
    showRepliedMessage();
    return () => {
      setReplyMsgId({replyMsgId: '', mainMsgIndex: 0});
    };
  }, [replyMsg.replyMsgId, findMoreMessages.current]);

  useEffect(() => {
    if (messages?.length) {
      sendReadReceipt(messages, socket, username, profileSuccess?.username);
    }
  }, [messages[0]?._raw['id']]);

  // Handle animation of online status
  useEffect(() => {
    if (!closeChat() && partnerStatus === 'online') {
      // Move the username up first then appear the status
      position.value = withTiming(0, {duration: 500});
      opacity.value = withDelay(500, withTiming(1, {duration: 500}));
    } else {
      // Fade out the status first then move the username down
      opacity.value = withTiming(0, {duration: 500}, () => {
        position.value = withTiming(10, {duration: 500});
      });
    }
  }, [
    partnerStatus,
    activeChat[0]?._raw['got_blocked_status'],
    activeChat[0]?._raw['deactivated'],
  ]);

  // Create animation styles of online status
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: position.value}],
  }));

  const statusStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sendMessage = async (textToSend?: string, type: string = 'message') => {
    if (activeChat[0]?._raw['you_blocked_status']) {
      showAlertBox(
        activeChat[0]?._raw['deactivated']
          ? content.AlertBox.accountDeactivated
          : content.AlertBox.blockedTitle,
        activeChat[0]?._raw['deactivated']
          ? content.AlertBox.accountDeactivatedDesc
          : content.AlertBox.unblockToOpen,
        hideAlertBox,
      );
      return;
    }
    let msg = '';
    if (textToSend) {
      msg = textToSend;
    } else if (getValues('chattext')) {
      msg = getValues('chattext');
      resetField('chattext');
    }
    setForwardMsg(undefined);

    if (msg) {
      let newMessage: Model = await getMessages(msg, false, type, forwardMsg);
      sendMessages(msg, username, type, newMessage.id, forwardMsg);
    }
  };

  const handleGifSelection = async () => {
    let gifUrl = await SheetManager.show('GiphyPopup-sheet');
    if (gifUrl) {
      sendMessage(gifUrl, 'gif');
    }
  };

  const handleImageSelection = async () => {
    if (activeChat[0]?._raw['you_blocked_status']) {
      showAlertBox(
        activeChat[0]?._raw['deactivated']
          ? content.AlertBox.accountDeactivated
          : content.AlertBox.blockedTitle,
        activeChat[0]?._raw['deactivated']
          ? content.AlertBox.accountDeactivatedDesc
          : content.AlertBox.unblockToOpen,
        hideAlertBox,
      );
      return;
    }
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 0,
      // includeBase64: true
    };

    try {
      const result = await launchImageLibrary(options);
      const allImages: string[] = [];

      for (const image of result.assets || []) {
        try {
          const uri = image.uri;

          // Compress the image
          const compressedResult = await Compress.compress(`${uri}`);
          // Add the compressed result to the allImages array
          allImages.push(compressedResult);

          // Optionally, handle the image further (e.g., call getMessages)
        } catch (error) {
          console.error('Error compressing image:', image.uri, error);
        }
      }
      if (allImages.length > 0) {
        await getMessages(
          {url: JSON.stringify(allImages), uploading: true},
          false,
          'image',
        );
      }
    } catch (err) {
      console.log('err at image selection :', err);
    }
  };

  const openUserProfle = () => {
    if (closeChat()) {
      showAlertBox(
        activeChat[0]?._raw['deactivated']
          ? content.AlertBox.accountDeactivated
          : content.AlertBox.blockedTitle,
        activeChat[0]?._raw['deactivated']
          ? content.AlertBox.accountDeactivatedDesc
          : content.AlertBox.blockError,
        hideAlertBox,
      );
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
      <View style={styles.padding}>
        <ChatHeader
          styles={styles}
          colors={colors}
          username={username}
          animatedStyle={animatedStyle}
          statusStyle={statusStyle}
          image={image}
          accountName={profileSuccess?.username}
          averageRating={userProfileSuccess?.averageRating[0]?.averageStars}
          openUserProfle={openUserProfle}
        />

        <FlashList
          data={messages}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          decelerationRate={0.9}
          scrollEnabled={scrollEnabled}
          ref={flashListRef}
          onScroll={handleScroll}
          renderItem={({item, index}: {item: MessageType; index: number}) => {
            return (
              <RenderMessageList
                username={username}
                account={profileSuccess?.username}
                id={item.id}
                forwardMsg={(forwardedMsg: forwardMsgType) =>
                  setForwardMsg(forwardedMsg)
                }
                toggleScroll={(scrollValue: boolean) => {
                  setScrollEnabled(scrollValue);
                }}
                text={item.text}
                type={item.type}
                uploadingImage={item.uploadingImage}
                received={item.received}
                createdAt={item.createdAt}
                msgCreatedAt={item.msgCreatedAt}
                sendMessages={sendMessages}
                index={index}
              />
            );
          }}
          contentContainerStyle={styles.chatContainer}
          getItemType={item => item.type}
          estimatedItemSize={120}
          inverted
          onEndReached={loadMoreMessages}
          onEndReachedThreshold={0.3}
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
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          name="chattext"
          secureTextEntry={false}
          control={control}
          label="Write"
          placeholder={
            activeChat[0]?._raw['deactivated']
              ? content.ChatScreen.chatDeactivated
              : activeChat[0]?._raw['got_blocked_status']
                ? content.ChatScreen.chatBlocked
                : content.ChatScreen.message
          }
          leftIcon={closeChat() ? 'block' : 'giphy'}
          rightIcon="gallary"
          handleRightIconPress={handleImageSelection}
          {...(!closeChat() && {
            handleLeftIconPress: handleGifSelection,
          })}
          multiline={true}
          editable={!closeChat()}
          replyMessage={forwardMsg}
          setReplyMessage={setForwardMsg}
        />

        {showScrollButton && (
          <Animated.View style={styles.scrollToBottomButton}>
            <TouchableOpacity
              onPress={scrollToBottom}
              style={styles.scrollButton}>
              <AntDesign
                name="arrowdown"
                size={moderateScale(10)}
                color={colors.iconPrimaryColor}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage()}>
          <Ionicons name="send" size={moderateScale(25)} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default enhance(ChatScreen);
