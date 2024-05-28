import {Typography} from '../../../Components';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import {useStartChat} from './CustomHook/useStartChat';
import React, {useEffect, useRef} from 'react';
import {View, Image} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {ChatScreenStyles, getChatScreenStyles} from './styles';
import {verticalScale} from '../../../Functions/StyleScale';
import Header from '../../../Components/Header';
import {TextInput} from '../../../Components';
import {useForm} from 'react-hook-form';
import {FlashList} from '@shopify/flash-list';
import {baseURL} from '../../../Constants';

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
) => (
  //   Console.log('hello chat header');

  <View style={styles.header}>
    <Header containerStyle={{paddingTop: 0}} />
    <Image
      source={{uri: `${baseURL}/${image}?${Date.now()}`}}
      style={styles.profileImage}
    />
    <View style={styles.headerTextContainer}>
      <Typography
        bgColor={colors.textPrimaryColor}
        fontWeight="400"
        textStyle={styles.headerText}>
        {username}
      </Typography>
      <Typography
        bgColor={colors.textPrimaryColor}
        fontWeight="400"
        textStyle={[styles.headerText, {paddingTop: verticalScale(7)}]}>
        {'View Profile'}
      </Typography>
    </View>
  </View>
);
const ChatScreen = ({navigation, route}: Props) => {
  const {username, skills, status, image, socket} = route.params;
  const {control, getValues, resetField} = useForm();
  const {getMessages, sendMessages, messages, partnerStatus} = useStartChat(
    socket,
    username,
    image,
  );
  const flashListRef = useRef(null);

  const {colors} = useTheme();
  const styles = getChatScreenStyles(colors);

  const sendMessage = async () => {
    if (socket && getValues('chattext')) {
      const msg = getValues('chattext');
      resetField('chattext');
      getMessages(msg, false);
      sendMessages(msg, username);
    }
  };

  const scrollToBottom = () => {
    if (flashListRef.current) {
      flashListRef.current.scrollToEnd({animated: true});
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
      {chatHeader(styles, colors, username, image)}

      <FlashList
        data={messages}
        showsVerticalScrollIndicator={false}
        ref={flashListRef}
        renderItem={renderMessageList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        estimatedItemSize={300}
        onLoad={scrollToBottom}
      />

      {/* <ScrollView style={styles.chatContainer}>
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="300"
          textStyle={styles.dateText}>
          {'1 FEB 12:00'}
        </Typography>
        <View style={styles.messageContainer}>
          <Typography
            fontWeight="300"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}>
            {
              'I commented on Figma, I want to add some fancy icons. Do you have any icon set?'
            }
          </Typography>
        </View>
        <View style={[styles.messageContainer, styles.messageContainerRight]}>
          <Typography
            fontWeight="300"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}>
            {' I am in a process of designing some. When do you need them?'}
          </Typography>
        </View>
        <View style={styles.messageContainer}>
          <Typography
            fontWeight="300"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}>
            {' Next month?'}
          </Typography>
        </View>
        <Typography
          fontWeight="300"
          bgColor={colors.textPrimaryColor}
          textStyle={styles.dateText}>
          {'08:12'}
        </Typography>
        <View style={[styles.messageContainer, styles.messageContainerRight]}>
          <Typography
            fontWeight="300"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}>
            {
              "I am almost finish. Please give me your email, I will ZIP them and  send you as soon as I'm finish."
            }
          </Typography>
        </View>
        <View style={[styles.messageContainer, styles.messageContainerRight]}>
          <Typography
            fontWeight="300"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}>
            {' ?'}
          </Typography>
        </View>
        <Typography
          fontWeight="300"
          bgColor={colors.textPrimaryColor}
          textStyle={styles.dateText}>
          {' 08:43'}
        </Typography>
        <View style={styles.messageContainer}>
          <Typography
            fontWeight="300"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}>
            {' maciej.kowalski@email.com'}
          </Typography>
        </View>
        <View style={[styles.messageContainer, styles.messageContainerRight]}>
          <Typography
            fontWeight="300"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}>
            {'👍'}
          </Typography>
        </View>
      </ScrollView> */}

      <View style={styles.inputContainer}>
        <TextInput
          viewStyle={styles.chatTextInput}
          name="chattext"
          secureTextEntry={false}
          control={control}
          label="Write"
          placeholder="Write..."
          leftIcon="chat"
          rightIcon="search"
          handleRightIconPress={sendMessage}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
