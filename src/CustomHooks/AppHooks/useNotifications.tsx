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
import {downloadImg} from '../../Functions/DownloadLocalPic';
import {SheetManager} from 'react-native-actions-sheet';
import content from '../../Assets/Languages/english.json';
import {hideAlertBox} from '../../Functions/ShowHideAlert';

type CustomRemoteMessageData = {
  message: string;
  senderUsername: string;
  type: string;
  notifee: string;
  receiverUsername: string;
  profilePic: string;
  id?: string;
  createdAt?: string;
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
              receiverUsername,
              profilePic,
              id,
              createdAt,
            } = remoteMessage.data;
            let downloadedPic: string | undefined;
            if (senderUsername && message && type) {
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
                  id,
                  createdAt,
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
                  id,
                  createdAt,
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
  const registerDeviceToken = async () => {
    try {
      let fcmToken = await getToken();
      if (fcmToken) {
        dispatch(sendDeviceToken({deviceToken: fcmToken}));
      } else {
        console.log('Failed to get FCM token');
      }
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  };

  const showPermissionDeniedAlert = () => {
    SheetManager.show('AlertBox-sheet', {
      payload: {
        title: content.AlertBox.notificationTitle,
        description: content.AlertBox.notificationDescription,
        onPressOk: hideAlertBox,
      },
    });
    console.log('Notifications permission denied');
  };

  const requestUserPermissionsAndroid = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        // Request POST_NOTIFICATIONS permission on Android 13 and above
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await registerDeviceToken();
        } else {
          showPermissionDeniedAlert();
        }
      } else {
        // For Android versions below 13, proceed without requesting POST_NOTIFICATIONS permission
        await registerDeviceToken();
      }
    } catch (err) {
      console.log('Error requesting notifications permission:', err);
    }
  };
};
