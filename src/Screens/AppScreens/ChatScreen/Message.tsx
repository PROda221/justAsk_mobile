import React from 'react';
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

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type MessageProps = {
  colors: DarkColors;
  styles: ChatScreenStyles;
  activeMsg: Model[] | undefined;
  username: string;
  id: string;
  type: 'message' | 'image' | 'gif';
  text: string;
  received: boolean;
  createdAt: number;
  msgCreatedAt?: Date;
  uploadProgress: number;
  index: number;
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
}: MessageProps) => {
  const showMsgTicks = () => {
    return (
      <>
        {activeMsg?.[0]?._raw['msg_id'] ? (
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            size={moderateScale(12)}
            color={
              activeMsg?.[0]?._raw['read']
                ? colors.readReceipt
                : colors.sentReceipt
            }
          />
        ) : activeMsg?.[0]?._raw['status'] === 'failed' ? (
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

  const getImages = (images: string) => {
    try {
      let imagesArray = JSON.parse(images);
      return imagesArray;
    } catch (err) {
      console.log('image is :', images);
      return [images];
    }
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        await updateMsgStatus(id, 'pending');
        sendMessages(text, username, type, id);
      }}
      disabled={activeMsg?.[0]?._raw['status'] !== 'failed'}
      style={[
        styles.messageContainer,
        received ? styles.messageReceived : styles.messageSent,
      ]}>
      <View
        style={[
          styles.messageBox,
          {
            minWidth: activeMsg?.[0]?._raw['forward_msg'] ? '50%' : '0%',
            alignItems: activeMsg?.[0]?._raw['forward_msg']
              ? 'flex-start'
              : 'center',
            backgroundColor: received
              ? colors.receivedMsgColor
              : colors.sentMsgColor,
          },
        ]}>
        {activeMsg?.[0]?._raw['forward_msg'] &&
          replyTo(
            activeMsg?.[0]?._raw['forward_msg'],
            activeMsg?.[0]?._raw['forward_msg_type'],
            activeMsg?.[0]?._raw['forward_msg_received'],
            activeMsg?.[0]?._raw['forward_msg_username'],
            activeMsg?.[0]?._raw['forward_msg_id'],
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
            uploadingImage={activeMsg?.[0]?._raw['uploading_image']}
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
                uploadingImage={activeMsg?.[0]?._raw['uploading_image']}
                uploadProgress={uploadProgress}
                blurhash={blurhash}
                openImage={openImage}
                retry
              />
            </TouchableOpacity>
            <View>
              {activeMsg?.[0]?._raw['uploading_image'] && (
                <ProgressBar progress={uploadProgress} />
              )}
            </View>
          </View>
        )}
      </View>
      <View style={styles.msgInfoContainer}>
        <Typography
          textStyle={styles.msgTime}
          fontWeight="400"
          bgColor={
            activeMsg?.[0]?._raw['status'] === 'failed'
              ? colors.retryMsg
              : 'white'
          }>
          {activeMsg?.[0]?._raw['status'] === 'failed'
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

export default Message;
