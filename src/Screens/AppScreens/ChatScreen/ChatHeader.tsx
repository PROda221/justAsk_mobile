import React from 'react';
import {ViewStyle, View, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {Typography} from '../../../Components';
import {resetUserProfileResponse} from '../../../Redux/Slices/UserProfileSlice';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';
import {ChatScreenStyles} from './styles';
import {Image} from 'expo-image';
import Header from '../../../Components/Header';
import {withObservables} from '@nozbe/watermelondb/react';
import {getCurrentChatObservable} from '../../../DB/DBFunctions';
import {Model} from '@nozbe/watermelondb';

type PropsType = {
  styles: ChatScreenStyles;
  colors: DarkColors;
  username: string;
  accountName?: string;
  image: string;
  animatedStyle: ViewStyle;
  statusStyle: ViewStyle;
  activeChat: Model[];
  openUserProfle: () => void;
};

const enhance = withObservables(
  ['accountName', 'username'],
  ({accountName, username}) => ({
    activeChat: getCurrentChatObservable(accountName, username),
  }),
);

const ChatHeader = ({
  styles,
  colors,
  username,
  animatedStyle,
  statusStyle,
  image,
  activeChat,
  openUserProfle,
}: PropsType) => {
  const dispatch = useDispatch();
  const resetUserProfileReducer = () => {
    dispatch(resetUserProfileResponse());
  };
  //   Console.log('hello hat header');
  return (
    <View style={styles.header}>
      <Header
        containerStyle={{paddingTop: 0}}
        onPress={resetUserProfileReducer}
      />
      <TouchableOpacity onPress={openUserProfle}>
        <Image
          source={{uri: activeChat[0]?._raw['profile_pic'] || image}}
          transition={200}
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

export default enhance(ChatHeader);
