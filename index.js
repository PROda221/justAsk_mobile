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
import {downloadImage} from './src/Functions/DownloadLocalPic';

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


messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    const {message, senderUsername, type, notifee, receiverUsername, profilePic} =
      remoteMessage.data;
    let downloadedPic;
    if (senderUsername && message && type) {
      displayNotification(JSON.parse(notifee));
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
      }else {
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
          downloadedPic
        );
      } else {
        await addMessageToChat(
          senderUsername,
          receiverUsername,
          message,
          true,
          type,
          false,
          downloadedPic
        );
      }
    }
  } catch (err) {
    throw new Error('local db error :', err);
  }
});

AppRegistry.registerComponent(appName, () => App);
