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

messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    const {message, senderUsername, type} = remoteMessage.data;
    const chatExists = await checkChatExists(senderUsername);
    if (!chatExists) {
      await createNewChat(
        senderUsername,
        `${senderUsername}-.png`,
      );
    }
    await addMessageToChat(senderUsername, message, true, type);
  } catch (err) {
    console.log('local db error :', err);
  }
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
