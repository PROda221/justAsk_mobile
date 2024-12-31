import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Autolink from 'react-native-autolink';
import {Typography} from '../../../Components';
import {ProgressBar} from '../../../Components/ProgressBar';
import {updateMsgStatus} from '../../../DB/DBFunctions';
import {formatTimestamp} from '../../../Functions/FormatTime';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';
import {ChatScreenStyles} from './styles';
import {Model} from '@nozbe/watermelondb';
import ImageComponent from './ImageComponent';
import content from '../../../Assets/Languages/english.json';
import moment from 'moment';
import {SheetManager} from 'react-native-actions-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../../Functions/StyleScale';
import ReplyMessageBar from '../../../Components/ReplyMessageBar';
import MultiImageBox from './MultiImageBox';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type MessageProps = {
  colors: DarkColors;
  styles: ChatScreenStyles;
  activeMsg: Model | undefined;
  username: string;
  id: string;
  type: 'message' | 'image' | 'gif';
  text: string;
  received: boolean;
  createdAt: number;
  msgCreatedAt?: Date;
  uploadProgress: number;
  index: number;
  highlightedMessageId: null | number;
  sendMessages: (
    imagemessageInputUrl: string,
    username: string,
    type: string,
    id: string,
  ) => void;
};

const openImage = (imageUrl: string[] | string) => {
  SheetManager.show('ViewProfileImage-sheet', {payload: {imageUrl}});
};

const convertTimeToMili = (dateString: string) => {
  const dateObject = new Date(dateString);
  const milliseconds = dateObject.getTime();
  const momentDate = moment(milliseconds);
  return momentDate;
};

const Message = ({
  activeMsg,
  username,
  id,
  received,
  text,
  type,
  createdAt,
  msgCreatedAt,
  sendMessages,
  colors,
  styles,
  uploadProgress,
  index,
  highlightedMessageId,
}: MessageProps) => {
  const fadeOpacity = useSharedValue(0);

  useEffect(() => {
    if (highlightedMessageId === index) {
      fadeOpacity.value = 1; // Reset to fully visible
      fadeOpacity.value = withTiming(
        0, // Animate to fully transparent
        {duration: 5000}, // Duration of the fade-out
      );
    }
  }, [highlightedMessageId, index]);
  const showMsgTicks = () => {
    return (
      <>
        {activeMsg?._raw['msg_id'] ? (
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            size={moderateScale(12)}
            color={
              activeMsg?._raw['read'] ? colors.readReceipt : colors.sentReceipt
            }
          />
        ) : activeMsg?._raw['status'] === 'failed' ? (
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            size={moderateScale(12)}
            color={colors.retryMsg}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            size={moderateScale(12)}
            color={colors.SendingReceipt}
          />
        )}
      </>
    );
  };

  const replyTo = (
    message: string,
    type: 'message' | 'image' | 'gif',
    received: boolean,
    username: string,
    id: string,
  ) => {
    return (
      <ReplyMessageBar
        forwardedMsg={{message, type, received, username, id}}
        showOnlyUi
        colors={colors}
        index={index}
      />
    );
  };

  const animatedMsgBackgroundStyle = useAnimatedStyle(() => {
    // Ensure `highlightedMessageId` and `fadeOpacity.value` are reactive
    const isHighlighted = highlightedMessageId === index;
    const originalColor = received
      ? colors.receivedMsgColor
      : colors.sentMsgColor;
    const backgroundColor = interpolateColor(
      fadeOpacity.value,
      [0, 1], // Fade range
      [originalColor, colors.highlightMessage], // From original color to gold
    );

    return {
      backgroundColor:
        isHighlighted && fadeOpacity.value > 0
          ? backgroundColor // Fading gold
          : received
            ? colors.receivedMsgColor // Received message color
            : colors.sentMsgColor, // Sent message color
    };
  });

  const getImages = (images: string) => {
    try {
      let imagesArray = JSON.parse(images);
      return imagesArray;
    } catch (err) {
      return [images];
    }
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        await updateMsgStatus(id, 'pending');
        sendMessages(text, username, type, id);
      }}
      disabled={activeMsg?._raw['status'] !== 'failed'}
      style={[
        styles.messageContainer,
        received ? styles.messageReceived : styles.messageSent,
      ]}>
      <Animated.View
        style={[
          styles.messageBox,
          animatedMsgBackgroundStyle,
          {
            minWidth: activeMsg?._raw['forward_msg'] ? '50%' : '0%',
            alignItems: activeMsg?._raw['forward_msg']
              ? 'flex-start'
              : 'center',
          },
        ]}>
        {activeMsg?._raw['forward_msg'] &&
          replyTo(
            activeMsg?._raw['forward_msg'],
            activeMsg?._raw['forward_msg_type'],
            activeMsg?._raw['forward_msg_received'],
            activeMsg?._raw['forward_msg_username'],
            activeMsg?._raw['forward_msg_id'],
          )}
        {type === 'message' && (
          <Typography
            fontWeight="300"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}>
            <Autolink text={text} email phone="sms" url />
          </Typography>
        )}
        {type === 'image' && (
          <MultiImageBox
            images={getImages(text)}
            styles={styles}
            colors={colors}
            id={id}
            errorText={content.ChatScreen.imageError}
            uploadingImage={activeMsg?._raw['uploading_image']}
            uploadProgress={uploadProgress}
            cachePolicy="memory-disk"
            blurhash={blurhash}
            openImage={openImage}
          />
        )}
        {type === 'gif' && (
          <View>
            <TouchableOpacity
              onPress={() => {
                openImage(text);
              }}>
              <ImageComponent
                text={text}
                styles={styles}
                colors={colors}
                id={id}
                cachePolicy="memory-disk"
                errorText={content.ChatScreen.gifError}
                uploadingImage={activeMsg?._raw['uploading_image']}
                uploadProgress={uploadProgress}
                blurhash={blurhash}
                openImage={openImage}
                retry
              />
            </TouchableOpacity>
            <View>
              {activeMsg?._raw['uploading_image'] && (
                <ProgressBar progress={uploadProgress} />
              )}
            </View>
          </View>
        )}
      </Animated.View>
      <View style={styles.msgInfoContainer}>
        <Typography
          textStyle={styles.msgTime}
          fontWeight="400"
          bgColor={
            activeMsg?._raw['status'] === 'failed' ? colors.retryMsg : 'white'
          }>
          {activeMsg?._raw['status'] === 'failed'
            ? 'Retry'
            : formatTimestamp(
                convertTimeToMili(
                  msgCreatedAt ? msgCreatedAt.toString() : createdAt.toString(),
                ),
              )}
        </Typography>
        {!received && showMsgTicks()}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Message);
