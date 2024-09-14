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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Autolink from 'react-native-autolink';
import moment from 'moment';
import {moderateScale} from '../../../Functions/StyleScale';

type PropTypes = {
  username: string;
  account?: string;
  id: string;
  type: 'message' | 'image';
  text: string;
  received: boolean;
  uploadingImage: boolean;
  createdAt: number;
  msgCreatedAt?: Date;
  sendMessages: (
    imageUrl: string,
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

export const RenderMessageList = ({
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
        sendMessages(uploadedUrl, username, 'image', id);
      }
    } catch (err) {
      console.log('err at image upload :', err);
    }
  };

  const showMsgTicks = () => {
    return (
      <>
        {msgCreatedAt ? (
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            size={moderateScale(12)}
            color="white"
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            size={moderateScale(15)}
            color="white"
          />
        )}
      </>
    );
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
            <Autolink text={text} email phone="sms" url />
          </Typography>
        )}
        {type === 'image' && (
          <View>
            <TouchableOpacity onPress={() => openImage(text)}>
              <Image source={{uri: `${text}`}} style={styles.imageChat} />
            </TouchableOpacity>
            <View>
              {uploadingImage && <ProgressBar progress={uploadProgress} />}
            </View>
          </View>
        )}
      </View>
      <View style={styles.msgInfoContainer}>
        <Typography textStyle={styles.msgTime} fontWeight="400" bgColor="white">
          {formatTimestamp(
            convertTimeToMili(
              msgCreatedAt ? msgCreatedAt.toString() : createdAt.toString(),
            ),
          )}
        </Typography>
        {!received && showMsgTicks()}
      </View>
    </View>
  );
};
