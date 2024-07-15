import {Typography} from '../../../Components';
import {type ParamListBase, type RouteProp} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type ViewStyle} from 'react-native';
import {useStartChat} from '../../../CustomHooks/AppHooks/useStartChat';
import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {type ChatScreenStyles, getChatScreenStyles} from './styles';
import {verticalScale} from '../../../Functions/StyleScale';
import Header from '../../../Components/Header';
import {TextInput} from '../../../Components';
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
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';
import {getProfilePic} from '../../../Functions/GetProfilePic';
import {Image} from 'expo-image';
import {markAllRead} from '../../../DB/DBFunctions';
import {setInChatScreen} from '../../../Redux/Slices/LocalReducer';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {RenderMessageList} from './RenderMessageList';

type MessageType = {
  item: {
    id: string;
    text: string;
    type: 'image' | 'message';
    received: boolean;
    uploadingImage: boolean;
  };
};
type Params = {
  params: {
    username: string;
    status: string;
    image: string;
    skills: string[];
  };
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<Params>;
};

const chatHeader = (
  styles: ChatScreenStyles,
  colors: DarkColors,
  username: string,
  image: string,
  animatedStyle: ViewStyle,
  statusStyle: ViewStyle,
  openUserProfle: () => void,
) => {
  //   Console.log('hello hat header');
  return (
    <View style={styles.header}>
      <Header containerStyle={{paddingTop: 0}} />
      <TouchableOpacity onPress={openUserProfle}>
        <Image
          source={{uri: getProfilePic(image)}}
          transition={200}
          cachePolicy={'none'}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Animated.View style={animatedStyle}>
          <Typography
            bgColor={colors.textPrimaryColor}
            fontWeight="400"
            textStyle={styles.headerText}>
            {username}
          </Typography>
        </Animated.View>
        <Animated.View style={statusStyle}>
          <Typography
            bgColor={colors.textPrimaryColor}
            fontWeight="400"
            textStyle={styles.headerText}>
            {'Online'}
          </Typography>
        </Animated.View>
      </View>
    </View>
  );
};

const ChatScreen = ({navigation, route}: Props) => {
  const {username, skills, status, image} = route.params;

  const {newMessage} = useSocket();
  const {getMessages, sendMessages, messages, partnerStatus, loadMoreMessages} =
    useStartChat(username, image, newMessage, skills, status);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {control, getValues, resetField} = useForm();

  const [height, setHeight] = useState<number>(verticalScale(50));

  const position = useSharedValue(partnerStatus === 'online' ? 0 : 10);
  const opacity = useSharedValue(partnerStatus === 'online' ? 1 : 0);

  const flashListRef = useRef(null);

  const {colors} = useTheme();

  const styles = getChatScreenStyles(colors);
  useEffect(() => {
    markAllRead(username);
    dispatch(setInChatScreen(isFocused));
    return () => {
      dispatch(setInChatScreen(false));
    };
  }, [isFocused]);

  // Handle animation of online status
  useEffect(() => {
    if (partnerStatus === 'online') {
      // Move the username up first then appear the status
      position.value = withTiming(0, {duration: 500});
      opacity.value = withDelay(500, withTiming(1, {duration: 500}));
    } else {
      // Fade out the status first then move the username down
      opacity.value = withTiming(0, {duration: 500}, () => {
        position.value = withTiming(10, {duration: 500});
      });
    }
  }, [partnerStatus]);

  // Create animation styles of online status
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: position.value}],
  }));

  const statusStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sendMessage = async () => {
    if (getValues('chattext')) {
      const msg = getValues('chattext');
      resetField('chattext');
      getMessages(msg, false, 'message');
      sendMessages(msg, username, 'message');
    }
  };

  const handleImageSelection = async () => {
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
    navigation.navigate('UserProfile', {username, skills, status, image});
  };

  return (
    <View style={styles.container}>
      {chatHeader(
        styles,
        colors,
        username,
        image,
        animatedStyle,
        statusStyle,
        openUserProfle,
      )}

      <FlashList
        data={messages}
        showsVerticalScrollIndicator={false}
        ref={flashListRef}
        renderItem={({item}: MessageType) => (
          <RenderMessageList
            username={username}
            id={item.id}
            text={item.text}
            type={item.type}
            uploadingImage={item.uploadingImage}
            received={item.received}
            sendMessages={sendMessages}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        estimatedItemSize={300}
        inverted
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        // OnLoad={scrollToBottom}
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
          placeholder="Write..."
          leftIcon="gallary"
          rightIcon="chat"
          handleRightIconPress={sendMessage}
          handleLeftIconPress={handleImageSelection}
          multiline={true}
          onContentSizeChange={event => {
            setHeight(event.nativeEvent.contentSize.height);
          }}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
