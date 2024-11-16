/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import {
  checkChatExists,
  addMessageToChat,
  createNewChat,
  getSenderNotifications,
  setSenderNotifications,
  clearSenderNotifications,
} from './src/DB/DBFunctions';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { saveURLImage } from './src/Functions/SaveBase64Image';
import { downloadImg } from './src/Functions/DownloadLocalPic';

// Notifee.onBackgroundEvent(async ({detail, type}) => {
//   const {notification} = detail
//   console.log('notification in notifee :', detail.notification);

//   // Check if the user pressed the "Mark as read" action
//   if (type === EventType.ACTION_PRESS) {
//     console.log('inside')
//     // Update external API
//   }
// });

const getImageUrl = async msg => {
  let imageUri = await saveURLImage(msg);
  let computedImg = { uri: `file://${imageUri}` };
  return computedImg.uri;
};

const displayNotification = async (notifeeData, senderUsername) => {
  await notifee.createChannel({
    id: 'test',
    name: 'test',
    importance: AndroidImportance.HIGH,
  });

  let notification = await getSenderNotifications(senderUsername);

  if (notification) {
    await notifee.displayNotification(notifeeData);
  } else {
    await setSenderNotifications(senderUsername);
    await notifee.displayNotification({
      ...notifeeData,
      android: { ...notifeeData.android, groupSummary: true },
    });
  }
};

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    // Cancel all notifications
    await notifee.cancelAllNotifications();
    await clearSenderNotifications();

    // Navigate to the desired screen or perform other actions
    // Example: navigation.navigate('YourScreen');
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    const {
      message,
      senderUsername,
      type,
      notifee,
      receiverUsername,
      profilePic,
      id,
      createdAt,
      forwardMessage,
      forwardMessageId,
      forwardMessageType,
      forwardMessageReceived,
      forwardMessageUsername,
    } = remoteMessage.data;
    let forwardMsg = {
      message: forwardMessage,
      id: forwardMessageId,
      type: forwardMessageType,
      received: Boolean(forwardMessageReceived),
      username: forwardMessageUsername,
    };
    let downloadedPic;
    if (senderUsername && message && type && id && createdAt) {
      displayNotification(JSON.parse(notifee), senderUsername);
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

      await addMessageToChat({
        chatId: senderUsername,
        account: receiverUsername,
        text: type === 'image' ? await getImageUrl(message) : message,
        isReceived: true,
        type,
        onChatScreen: false,
        profilePic: downloadedPic,
        id,
        createdAt,
        forwardMsg,
      });
    }
  } catch (err) {
    throw new Error('local db error :', err);
  }
});

AppRegistry.registerComponent(appName, () => App);
