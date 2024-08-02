import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../../../Components';
import React, {useEffect, useState} from 'react';
import {ProgressBar} from '../../../Components/ProgressBar';
import {Image} from 'expo-image';
import {SheetManager} from 'react-native-actions-sheet';

import {getChatScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {uploadImage} from '../../../Functions/UploadImg';
import {updateImageUploadStatus} from '../../../DB/DBFunctions';
import {formatTimestamp} from '../../../Functions/FormatTime';
import moment from 'moment';

type PropTypes = {
  username: string;
  account?: string;
  id: string;
  type: 'message' | 'image';
  text: string;
  received: boolean;
  uploadingImage: boolean;
  createdAt: number;
  youBlockedStatus: boolean;
  sendMessages: (imageUrl: string, username: string, type: string) => void;
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

export const RenderMessageList = ({
  username,
  account,
  id,
  received,
  text,
  type,
  uploadingImage,
  createdAt,
  youBlockedStatus,
  sendMessages,
}: PropTypes): JSX.Element => {
  const {colors} = useTheme();
  const styles = getChatScreenStyles(colors);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    if (type === 'image' && uploadingImage) {
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
        console.log('a');
        sendMessages(uploadedUrl, username, 'image');
      }
    } catch (err) {
      console.log('err at image upload :', err);
    }
  };

  return (
    <View
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
            {text}
          </Typography>
        )}
        {type === 'image' && (
          <View>
            <TouchableOpacity onPress={() => openImage(text)}>
              <Image source={{uri: `${text}`}} style={styles.imageChat} />
            </TouchableOpacity>
            <View style={styles.imageChatBottom}>
              {uploadingImage && <ProgressBar progress={uploadProgress} />}
            </View>
          </View>
        )}
      </View>
      <Typography textStyle={styles.msgTime} fontWeight="400" bgColor="white">
        {formatTimestamp(convertTimeToMili(createdAt.toString()))}
      </Typography>
    </View>
  );
};
