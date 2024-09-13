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
} from './src/DB/DBFunctions';
import notifee from '@notifee/react-native';
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

const displayNotification = async notifeeData => {
  await notifee.createChannel({
    id: 'test',
    name: 'test',
  });

  await notifee.displayNotification(notifeeData);
};

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
      displayNotification(JSON.parse(notifee));
    }
  } catch (err) {
    throw new Error('local db error :', err);
  }
});

AppRegistry.registerComponent(appName, () => App);
