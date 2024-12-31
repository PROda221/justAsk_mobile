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
  averageRating?: number;
  profilePic?: string;
  openUserProfle: () => void;
};

const ChatHeader = ({
  styles,
  colors,
  username,
  animatedStyle,
  statusStyle,
  image,
  profilePic,
  averageRating = 0,
  openUserProfle,
}: PropsType) => {
  const dispatch = useDispatch();
  const resetUserProfileReducer = () => {
    dispatch(resetUserProfileResponse());
  };
  return (
    <View style={styles.header}>
      <Header
        containerStyle={{paddingTop: 0}}
        onPress={resetUserProfileReducer}
      />
      <TouchableOpacity onPress={openUserProfle}>
        <Image
          source={{uri: profilePic || image}}
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
          {/* Feedback on chat header
          <Typography
            bgColor={colors.textPrimaryColor}
            fontWeight="400"
            textStyle={styles.headerText}>
            <Entypo name="star" size={15} />
            {`${averageRating}x`}
          </Typography> */}
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

export default ChatHeader;
