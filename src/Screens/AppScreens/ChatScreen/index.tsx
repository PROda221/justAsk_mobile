import {Typography} from '../../../Components';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LogBox, ViewStyle} from 'react-native';
import {useStartChat} from './CustomHook/useStartChat';
import React, {useEffect, useRef, useState} from 'react';
import {View, Image} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {ChatScreenStyles, getChatScreenStyles} from './styles';
import {verticalScale} from '../../../Functions/StyleScale';
import Header from '../../../Components/Header';
import {TextInput} from '../../../Components';
import {useForm} from 'react-hook-form';
import {FlashList} from '@shopify/flash-list';
import {baseURL} from '../../../Constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

const chatHeader = (
  styles: ChatScreenStyles,
  colors: any,
  username: string,
  image: string,
  animatedStyle: ViewStyle,
  statusStyle: ViewStyle,
) => (
  //   Console.log('hello chat header');

  <View style={styles.header}>
    <Header containerStyle={{paddingTop: 0}} />
    <Image source={{uri: `${baseURL}/${image}`}} style={styles.profileImage} />
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
  const {username, skills, status, image, socket} = route.params;
  const {control, getValues, resetField} = useForm();
  const {getMessages, sendMessages, messages, partnerStatus, loadMoreMessages} =
    useStartChat(socket, username, image);

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
    if (socket && getValues('chattext')) {
      const msg = getValues('chattext');
      resetField('chattext');
      getMessages(msg, false);
      sendMessages(msg, username);
    }
  };

  const renderMessageList = ({item}) => (
    // Console.log('hello render message')
    <View
      style={[
        styles.messageContainer,
        item.received ? {} : styles.messageContainerRight,
      ]}>
      <Typography
        fontWeight="300"
        bgColor={colors.textPrimaryColor}
        textStyle={styles.messageText}>
        {item.text}
      </Typography>
    </View>
  );

  return (
    <View style={styles.container}>
      {chatHeader(styles, colors, username, image, animatedStyle, statusStyle)}

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
          leftIcon="chat"
          rightIcon="chat"
          handleRightIconPress={sendMessage}
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
