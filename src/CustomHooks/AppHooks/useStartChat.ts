import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  addMessageToChat,
  checkChatExists,
  createNewChat,
  getAllMessagesForChat,
} from '../../DB/DBFunctions';
import {Model} from '@nozbe/watermelondb';
import {AppState} from 'react-native';
import {useSocket} from '../../useContexts/SocketContext';

let allMessages: Model[] = [];

export const useStartChat = (
  username: string,
  profilePic: string,
  newMessage: any,
  skills: Array<string>,
  status: string
) => {
  const [partnerStatus, setPartnerStatus] = useState('offline');
  const [messages, setMessages] = useState<Model[]>([]);
  const [chatId, setChatId] = useState<string>('')
  const [hasMore, setHasMore] = useState<boolean>(true);
  const appState = useRef(AppState.currentState);
  const {socket} = useSocket();


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
        const {allStoredMsgs, chatId} = await getAllMessagesForChat(username);
        allMessages = allStoredMsgs
        setChatId(chatId)
        if (allMessages.length) {
          setMessages(allMessages?.slice(0, 20));
        }
      } else {
        await createNewChat(username, profilePic, status, skills);
      }
    } catch (err) {
      console.log('local db error :', err);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('forground');
        fetchMessages();
      } else {
        console.log('background');
        appState.current = nextAppState;
      }
    });
    return () => {
      subscription.remove();
      socket?.off('statusUpdate');
    };
  }, []);

  useEffect(() => {
    if (newMessage && newMessage._raw.chat_id === chatId) {
      setMessages(prevMessages => [newMessage, ...prevMessages]);
    }
  }, [newMessage]);

  useEffect(() => {
    fetchMessages();
    const connectWithUser = async () => {
      const myUsername = profileSlice?.success?.username;
      socket?.emit('join', {userId: myUsername, chatPartnerId: username});

      socket?.on('statusUpdate', statusUpdate => {
        const {status} = statusUpdate;
        setPartnerStatus(status);
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
