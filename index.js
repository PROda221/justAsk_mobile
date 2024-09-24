/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import {
  checkChatExists,
  addMessageToChat,
  createNewChat,
  getSenderNotifications,
  setSenderNotifications,
  clearSenderNotifications,
} from './src/DB/DBFunctions';
import notifee, {EventType} from '@notifee/react-native';
import {saveURLImage} from './src/Functions/SaveBase64Image';
import {downloadImg} from './src/Functions/DownloadLocalPic';

// Notifee.onBackgroundEvent(async ({detail, type}) => {
//   const {notification} = detail
//   console.log('notification in notifee :', detail.notification);

//   // Check if the user pressed the "Mark as read" action
//   if (type === EventType.ACTION_PRESS) {
//     console.log('inside')
//     // Update external API
//   }
// });

const displayNotification = async (notifeeData, senderUsername) => {
  await notifee.createChannel({
    id: 'test',
    name: 'test',
  });

  let notification = await getSenderNotifications(senderUsername);

  if (notification) {
    await notifee.displayNotification(notifeeData);
  } else {
    await setSenderNotifications(senderUsername);
    await notifee.displayNotification({
      ...notifeeData,
      android: {...notifeeData.android, groupSummary: true},
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
    } = remoteMessage.data;
    let downloadedPic;
    if (senderUsername && message && type && id && createdAt) {
      displayNotification(JSON.parse(notifee), senderUsername);
    }
  } catch (err) {
    throw new Error('local db error :', err);
  }
});

AppRegistry.registerComponent(appName, () => App);
