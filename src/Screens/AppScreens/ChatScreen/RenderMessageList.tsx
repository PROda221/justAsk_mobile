import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../../../Components';
import React, {useEffect, useState} from 'react';
import {ProgressBar} from '../../../Components/ProgressBar';
import {Image} from 'expo-image';
import {SheetManager} from 'react-native-actions-sheet';

import {getChatScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {uploadImage} from '../../../Functions/UploadImg';
import {
  getCurrentMsgObservable,
  updateImageUploadStatus,
  updateMsgStatus,
} from '../../../DB/DBFunctions';
import {formatTimestamp} from '../../../Functions/FormatTime';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Autolink from 'react-native-autolink';
import moment from 'moment';
import {moderateScale} from '../../../Functions/StyleScale';
import {withObservables} from '@nozbe/watermelondb/react';
import {Model} from '@nozbe/watermelondb';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type PropTypes = {
  activeMsg: Model[] | undefined;
  username: string;
  account?: string;
  id: string;
  type: 'message' | 'image' | 'gif';
  text: string;
  received: boolean;
  uploadingImage: boolean;
  createdAt: number;
  msgCreatedAt?: Date;
  sendMessages: (
    imagemessageInputUrl: string,
    username: string,
    type: string,
    id: string,
  ) => void;
};

const openImage = (imageUrl: string) => {
  SheetManager.show('ViewProfileImage-sheet', {payload: {imageUrl}});
};

const convertTimeToMili = (dateString: string) => {
  const dateObject = new Date(dateString);
  const milliseconds = dateObject.getTime();
  const momentDate = moment(milliseconds);
  return momentDate;
};

const enhance = withObservables(['id'], ({id}) => ({
  activeMsg: getCurrentMsgObservable(id),
}));

const RenderMessageList = ({
  activeMsg,
  username,
  account,
  id,
  received,
  text,
  type,
  uploadingImage,
  createdAt,
  msgCreatedAt,
  sendMessages,
}: PropTypes): JSX.Element => {
  const {colors} = useTheme();
  const styles = getChatScreenStyles(colors);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    if (type === 'image' && activeMsg?.[0]?._raw['uploading_image']) {
      uploadAndShareImage();
    }
  }, [text]);

  const currentProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const uploadAndShareImage = async () => {
    try {
      const uploadedUrl = await uploadImage(text, currentProgress);
      if (uploadedUrl) {
        await updateImageUploadStatus(username, account, id, false);
        sendMessages(uploadedUrl, username, 'image', id);
      }
    } catch (err) {
      console.log('err at image upload :', err);
    }
  };

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

  return (
    <TouchableOpacity
      onPress={async () => {
        await updateMsgStatus(id, 'pending');
        console.log('1');
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
            backgroundColor: received
              ? colors.receivedMsgColor
              : colors.sentMsgColor,
          },
        ]}>
        {type === 'message' && (
          <Typography
            fontWeight="300"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.messageText}>
            <Autolink text={text} email phone="sms" url />
          </Typography>
        )}
        {type === 'image' && (
          <View>
            <TouchableOpacity onPress={() => openImage(text)}>
              <Image
                contentFit="cover"
                source={{uri: `${text}`}}
                style={styles.imageChat}
              />
            </TouchableOpacity>
            <View>
              {activeMsg?.[0]?._raw['uploading_image'] && (
                <ProgressBar progress={uploadProgress} />
              )}
            </View>
          </View>
        )}
        {type === 'gif' && (
          <View>
            <TouchableOpacity
              onPress={() => {
                openImage(text);
              }}>
              <Image
                contentFit="cover"
                source={{uri: text}}
                style={styles.imageChat}
                cachePolicy={'memory-disk'}
                placeholder={{blurhash: blurhash}}
                recyclingKey={id}
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

export default enhance(RenderMessageList);
