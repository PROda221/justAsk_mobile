import {Typography} from '../../../Components';
import {type ParamListBase, type RouteProp} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LogBox, type ViewStyle} from 'react-native';
import {useStartChat} from '../../../CustomHooks/AppHooks/useStartChat';
import React, {useEffect, useRef, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
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
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useSocket} from '../../../useContexts/SocketContext';
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';
import {getProfilePic} from '../../../Functions/GetProfilePic';
import {SheetManager} from 'react-native-actions-sheet';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

const convertToBase64 = async (uri: string) => {
  try {
    const base64Data = await ReactNativeBlobUtil.fs.readFile(uri, 'base64');
    return base64Data;
  } catch (err) {
    console.error('Error converting image to base64: ', err);
  }
};

const openImage = (imageUrl: string) => {
  SheetManager.show('ViewProfileImage-sheet', {payload: {imageUrl}});
};

const chatHeader = (
  styles: ChatScreenStyles,
  colors: DarkColors,
  username: string,
  image: string,
  animatedStyle: ViewStyle,
  statusStyle: ViewStyle,
  openUserProfle: () => void,
) => (
  //   Console.log('hello chat header');

  <View style={styles.header}>
    <Header containerStyle={{paddingTop: 0}} />
    <TouchableOpacity onPress={openUserProfle}>
      <Image source={{uri: getProfilePic(image)}} style={styles.profileImage} />
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
const ChatScreen = ({navigation, route}: Props) => {
  const {username, skills, status, image} = route.params;

  const {newMessage} = useSocket();
  const {getMessages, sendMessages, messages, partnerStatus, loadMoreMessages} =
    useStartChat(username, image, newMessage, skills, status);

  const {control, getValues, resetField} = useForm();

  const [height, setHeight] = useState<number>(verticalScale(50));

  const position = useSharedValue(partnerStatus === 'online' ? 0 : 10);
  const opacity = useSharedValue(partnerStatus === 'online' ? 1 : 0);

  const flashListRef = useRef(null);

  const {colors} = useTheme();
  const styles = getChatScreenStyles(colors);

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
      const fileName = result.assets?.[0].fileName;
      const uri = result.assets?.[0].uri;
      const compressedResult = await Compress.compress(`${uri}`);
      const base64Data = await convertToBase64(compressedResult);
      getMessages({fileName, uri}, false, 'image');
      sendMessages({fileName, base64Data}, username, 'image');
    } catch (err) {
      console.log('err at image selection :', err);
    }
  };

  const renderMessageList = ({
    item,
  }: {
    item: {received: boolean; text: string; type: 'message' | 'image'};
  }) => (
    // Console.log('hello render message')
    <View
      style={[
        styles.messageContainer,
        item.received ? {} : styles.messageContainerRight,
      ]}>
      {item.type === 'message' && (
        <Typography
          fontWeight="300"
          bgColor={colors.textPrimaryColor}
          textStyle={styles.messageText}>
          {item.text}
        </Typography>
      )}
      {item.type === 'image' && (
        <TouchableOpacity onPress={() => openImage(item.text)}>
          <Image source={{uri: `${item.text}`}} style={styles.imageChat} />
        </TouchableOpacity>
      )}
    </View>
  );

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
        renderItem={renderMessageList}
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
