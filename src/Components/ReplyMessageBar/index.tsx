import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {forwardMsgType} from '../../Screens/AppScreens/ChatScreen/types';
import {DarkColors} from '../../useContexts/Theme/ThemeType';
import {Typography} from '../Typography';
import {getReplyMessageBarStyles} from './styles';
import {moderateScale} from '../../Functions/StyleScale';
import {Image} from 'expo-image';
import {setReplyMsgId} from '../../Redux/Slices/LocalReducer';
import {useDispatch} from 'react-redux';

type ReplyMessageBarProps = {
  clearReply?: React.Dispatch<React.SetStateAction<forwardMsgType | undefined>>;
  forwardedMsg: forwardMsgType;
  colors: DarkColors;
  index?: number;
  showOnlyUi?: boolean;
};

const replyMsg = (forwardedMsg: forwardMsgType) => {
  if (forwardedMsg.type === 'message') {
    return forwardedMsg.message;
  }
  return forwardedMsg.type.charAt(0).toUpperCase() + forwardedMsg.type.slice(1);
};

const ReplyMessageBar = ({
  clearReply,
  forwardedMsg,
  colors,
  showOnlyUi,
  index,
}: ReplyMessageBarProps) => {
  const styles = getReplyMessageBarStyles(colors);

  let dispatch = useDispatch();

  const handleReplyBoxPress = () => {
    dispatch(setReplyMsgId({replyMsgId: forwardedMsg.id, mainMsgIndex: index}));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!showOnlyUi}
      onPress={handleReplyBoxPress}>
      <View style={styles.forwardIconContainer}>
        {!showOnlyUi && (
          <Entypo
            name="forward"
            size={moderateScale(25)}
            color={colors.forwardMessageIcon}
          />
        )}
      </View>
      <View style={{flex: 1}}>
        <Typography
          bgColor={colors.textPrimaryColor}
          textStyle={styles.labelText}
          numberOfLines={1}
          elipses="tail"
          fontWeight={'400'}>
          {forwardedMsg.username}
        </Typography>
        <View style={styles.replyBox}>
          <Typography
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}
            elipses="tail"
            numberOfLines={2}
            fontWeight={'400'}>
            {replyMsg(forwardedMsg)}
          </Typography>
        </View>
      </View>
      {forwardedMsg.type !== 'message' && (
        <View style={styles.replyImageContainer}>
          <Image
            source={{uri: forwardedMsg.message}}
            style={styles.replyImageStyle}
            contentFit="contain"
          />
        </View>
      )}
      {!showOnlyUi && (
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => clearReply?.(undefined)}>
          <Entypo
            name="circle-with-cross"
            size={moderateScale(25)}
            color={colors.forwardMessageIcon}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default ReplyMessageBar;
