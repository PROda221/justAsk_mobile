import {useEffect, useRef, useState} from 'react';
import {Socket} from 'socket.io-client';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {
  addMessageToChat,
  checkChatExists,
  createNewChat,
  getAllMessagesForChat,
} from '../../../../DB/DBFunctions';
import {Model} from '@nozbe/watermelondb';
import {Alert, AppState} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { useSocket } from '../../../../useContexts/SocketContext';

let allMessages: Model[] = [];
const DOWNLOAD_DIR = RNFetchBlob.fs.dirs.DownloadDir;

export const useStartChat = (
  username: string,
  profilePic: string,
) => {
  const [partnerStatus, setPartnerStatus] = useState('offline');
  const [messages, setMessages] = useState<Model[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const appState = useRef(AppState.currentState);
  const { socket } = useSocket();

  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const sendMessages = async (
    messageInput: string | object,
    username: string,
    type: string = 'message',
  ) => {
    socket?.emit(
      'chat message',
      messageInput,
      profileSlice.success?.username,
      username,
      type,
    );
  };

  const getMessages = async (
    msg: string | object,
    isReceived: boolean,
    type: string = 'message',
  ) => {
    try {
      let newMessage;
      if (typeof msg == 'object') {
        newMessage = await addMessageToChat(
          username,
          msg.uri,
          isReceived,
          type,
        );
      } else {
        newMessage = await addMessageToChat(username, msg, isReceived, type);
      }

      setMessages(prevMessages => [newMessage, ...prevMessages]);
    } catch (err) {
      console.log('err on getMessage :', err);
    }
  };

  const loadMoreMessages = () => {
    if (hasMore && allMessages.length && messages.length) {
      const currentLength = messages.length;
      const nextBatch = allMessages?.slice(currentLength, currentLength + 20);

      if (nextBatch.length < 20) {
        setHasMore(false);
      }

      setMessages(prevMessages => [...prevMessages, ...nextBatch]);
    }
  };

  const fetchMessages = async () => {
    try {
      const chatExists = await checkChatExists(username);
      if (chatExists) {
        allMessages = await getAllMessagesForChat(username);
        if (allMessages.length) {
          setMessages(allMessages?.slice(0, 20));
        }
      } else {
        await createNewChat(username, profilePic);
      }
    } catch (err) {
      console.log('local db error :', err);
    }
  };

  const saveBase64Image = async ({base64Data, fileName}) => {
    const imagePath = `${DOWNLOAD_DIR}/${fileName}`;
    try {
      await RNFetchBlob.fs.writeFile(imagePath, base64Data, 'base64');
      return imagePath;
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save the image.');
      return null;
    }
  };


  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('forground')
        fetchMessages()
      } else {
        console.log('background')
        appState.current = nextAppState;
        // socket?.emit('statusUpdate', profileSuccess?.username, 'offline');
      }
    });
    return () => {
      subscription.remove();
      socket?.off('statusUpdate')
      socket?.off('chat message')
    };
  }, []);
  

  useEffect(() => {
    fetchMessages();
    const connectWithUser = async () => {
      const myUsername = profileSlice?.success?.username;
      socket?.emit('join', {userId: myUsername, chatPartnerId: username});

      socket?.on('statusUpdate', statusUpdate => {
        const {status} = statusUpdate;
        setPartnerStatus(status);
      });

      // Chat with user

      socket?.on('chat message', async (msg, type) => {
        if (type === 'image') {
          let imageUri = await saveBase64Image(msg);
          console.log('imageUri? :', imageUri);
          let computedImg = {uri: `file://${imageUri}`, fileName: msg.fileName};
          getMessages(computedImg, true, type);
        } else {
          getMessages(msg, true, type);
        }
      });
    };

    connectWithUser();
  }, [username]);

  return {
    partnerStatus,
    messages,
    getMessages,
    sendMessages,
    loadMoreMessages,
  };
};
