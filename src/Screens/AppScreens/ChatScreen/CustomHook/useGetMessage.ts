import {useEffect, useState} from 'react';
import {
  addMessageToChat,
  checkChatExists,
  createNewChat,
} from '../../../../DB/DBFunctions';
import {Alert} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {Socket} from 'socket.io-client';

const DOWNLOAD_DIR = ReactNativeBlobUtil.fs.dirs.DownloadDir;

export const useGetMessage = (socket: Socket | null) => {
  const [newMessage, setNewMessage] = useState();

  // const appState = useRef(AppState.currentState);

  const getMessages = async (
    msg: string | object,
    isReceived: boolean,
    type: string = 'message',
    senderId: string,
  ) => {
    try {
      console.log('check :', senderId, msg);
      const chatExists = await checkChatExists(senderId);
      if (!chatExists) {
        console.log('a');
        await createNewChat(senderId, `${senderId}-.png`);
      }
      let newMessage;
      if (typeof msg == 'object') {
        newMessage = await addMessageToChat(
          senderId,
          msg.uri,
          isReceived,
          type,
        );
      } else {
        console.log('b');
        newMessage = await addMessageToChat(senderId, msg, isReceived, type);
      }
      //set message

      setNewMessage(newMessage);
    } catch (err) {
      console.log('err on getMessage :', err);
    }
  };

  const saveBase64Image = async ({base64Data, fileName}) => {
    const imagePath = `${DOWNLOAD_DIR}/${fileName}`;
    try {
      await ReactNativeBlobUtil.fs.writeFile(imagePath, base64Data, 'base64');
      return imagePath;
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save the image.');
      return null;
    }
  };

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('forground');
  //     //   fetchMessages();
  //     } else {
  //       console.log('background');
  //       appState.current = nextAppState;
  //       // socket?.emit('statusUpdate', profileSuccess?.username, 'offline');
  //     }
  //   });
  //   return () => {
  //     subscription.remove();
  //     socket?.off('chat message');
  //   };
  // }, []);

  useEffect(() => {
    const receiveMessage = async () => {
      // Receive message
      socket?.on('chat message', async (msg, type, senderId) => {
        if (type === 'image') {
          let imageUri = await saveBase64Image(msg);
          let computedImg = {uri: `file://${imageUri}`, fileName: msg.fileName};
          getMessages(computedImg, true, type, senderId);
        } else {
          getMessages(msg, true, type, senderId);
        }
      });
    };

    receiveMessage();

    return () => {
      socket?.off('chat message');
    };
  }, [socket]);

  return {newMessage};
};
