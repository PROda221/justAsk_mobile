import {useEffect} from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {sendDeviceToken} from '../../Redux/Slices/NotificationsSlice';
import {useDispatch} from 'react-redux';
import {
  addMessageToChat,
  checkChatExists,
  createNewChat,
} from '../../DB/DBFunctions';
import {saveURLImage} from '../../Functions/SaveBase64Image';
import {downloadImage} from '../../Functions/DownloadLocalPic';
import notifee from '@notifee/react-native';

type CustomRemoteMessageData = {
  message: string;
  senderUsername: string;
  type: string;
  notifee: string;
  receiverUsername: string;
  profilePic: string;
};

type CustomRemoteMessage = FirebaseMessagingTypes.RemoteMessage & {
  data: CustomRemoteMessageData;
};

export const useNotifications = () => {
  let dispatch = useDispatch();

  // const displayNotification = async notifeeData => {
  //   await notifee.createChannel({
  //     id: 'test',
  //     name: 'test',
  //   });

  //   await notifee.displayNotification(notifeeData);
  // };

  const downloadImg = async (imgUrl, prevImg = '') => {
    try {
      let downloadedPic;
      downloadedPic = await downloadImage(imgUrl ?? '', prevImg);

      let computedImg = {uri: `file://${downloadedPic}`};
      return computedImg.uri;
    } catch (err) {
      console.log('err in fetchProfilePic :', err);
    }
  };

  useEffect(() => {
    if (Platform.OS == 'ios') {
      requestUserPermissionIos();
    } else {
      requestUserPermissionsAndroid();
    }
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: CustomRemoteMessage) => {
        try {
          if (remoteMessage.data) {
            const {
              message,
              senderUsername,
              type,
              notifee,
              receiverUsername,
              profilePic,
            } = remoteMessage.data;
            let downloadedPic;
            if (senderUsername && message && type) {
              // displayNotification(JSON.parse(notifee));
              const chatExists = await checkChatExists(
                senderUsername,
                receiverUsername,
              );
              if (!chatExists) {
                downloadedPic = await downloadImg(profilePic);
                await createNewChat(
                  senderUsername,
                  downloadedPic,
                  '',
                  '',
                  receiverUsername,
                );
              } else {
                downloadedPic = await downloadImg(
                  profilePic,
                  chatExists?.['profile_pic'],
                );
              }
              if (type === 'image') {
                let imageUri = await saveURLImage(message);
                let computedImg = {uri: `file://${imageUri}`};
                await addMessageToChat(
                  senderUsername,
                  receiverUsername,
                  computedImg.uri,
                  true,
                  type,
                  false,
                  downloadedPic,
                );
              } else {
                await addMessageToChat(
                  senderUsername,
                  receiverUsername,
                  message,
                  true,
                  type,
                  false,
                  downloadedPic,
                );
              }
            }
          }
        } catch (err: unknown) {
          throw new Error('local db error :' + err);
        }
      },
    );

    return unsubscribe;
  }, []);

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    return fcmToken;
  };

  const requestUserPermissionIos = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const requestUserPermissionsAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let fcmToken = await getToken();
        dispatch(sendDeviceToken({deviceToken: fcmToken}));
      } else {
        console.log('Notifications permission denied');
      }
    } catch (err) {
      console.log('error getting notifications :', err);
    }
  };
};
