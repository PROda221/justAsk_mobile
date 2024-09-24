import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  addMessageToChat,
  checkChatExists,
  createNewChat,
  getAllMessagesForChat,
  getLatestMessageForChat,
  storeSyncedMessages,
} from '../../DB/DBFunctions';
import {Model} from '@nozbe/watermelondb';
import {AppState} from 'react-native';
import {useSocket} from '../../useContexts/SocketContext';
import {useSyncMessages} from './useSyncMessages';
import {Messages} from '../../Redux/Slices/SyncMessagesSlice';
import NetInfo from "@react-native-community/netinfo";

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
  const [chatId, setChatId] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const appState = useRef(AppState.currentState);
  const wasConnected = useRef(false)
  const initialMount = useRef(true)
  const {socket} = useSocket();
  const {callSyncMessagesApi, syncMessagesSuccess, resetSyncMessagesReducer, syncMessagesLoading} =
    useSyncMessages();

  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const sendMessages = async (
    messageInput: string,
    username: string,
    type: string = 'message',
    messageId: string,
  ) => {
    socket?.volatile.emit(
      'chat message',
      messageInput,
      profileSlice.success?.username,
      username,
      type,
      profileSlice.success?.profilePic,
      messageId,
    );
  };

  const getMessages = async (
    msg: string | object,
    isReceived: boolean,
    type: string = 'message',
  ) => {
    try {
      newMessage = await addMessageToChat(
        username,
        profileSlice.success?.username,
        msg,
        isReceived,
        type,
        true,
      );
      setMessages(prevMessages => [newMessage, ...prevMessages]);
      return newMessage;
    } catch (err) {
      console.log('err on getMessage in useStartChat:', err);
    }
  };

  const loadMoreMessages = () => {
    if (hasMore && allMessages.length && messages?.length) {
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
      const chatExists = await checkChatExists(
        username,
        profileSlice.success?.username,
      );
      if (chatExists) {
        const latestMsg = await getLatestMessageForChat(
          username,
          profileSlice.success?.username,
        );
        callSyncMessagesApi(
          profileSlice.success?.username,
          username,
          latestMsg?._raw?.['msg_id'] ?? '',
        );
        const {allLocalStoredMsgs, chatId} = await getAllMessagesForChat(
          username,
          profileSlice.success?.username,
        );
        allMessages = allLocalStoredMsgs;
        setChatId(chatId);
        if (allMessages.length) {
          setMessages(allMessages?.slice(0, 20));
        }
      } else {
        await createNewChat(
          username,
          profilePic,
          status,
          skills,
          profileSlice.success?.username,
        );
      }
    } catch (err) {
      console.log('local db error :', err);
    }
  };

  useEffect(() => {
    const getMessages = async (data: Messages[]) => {
      if (data.length) {
        let newMessages: Model[] = [];
        newMessages = await storeSyncedMessages(
          profileSlice.success?.username,
          username,
          data,
        );
        newMessages.reverse();
        setMessages(prevMessages => [...newMessages, ...prevMessages]);
      }
    };
    if (syncMessagesSuccess) {
      getMessages(syncMessagesSuccess.data);
      resetSyncMessagesReducer();
    }
  }, [syncMessagesSuccess]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
          fetchMessages();
      } else {
        appState.current = nextAppState;
      }
    });
    const networkSubscription = NetInfo.addEventListener(state => {
      if(state.isConnected && !wasConnected.current && !initialMount.current){
        wasConnected.current = true;
        fetchMessages();
       
      }else if (!state.isConnected) {
        wasConnected.current = false; // Reset connection status when offline
      }
    });
  
    return () => {
      networkSubscription()
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
    initialMount.current = false
  }, [username]);

  return {
    partnerStatus,
    messages,
    syncMessagesLoading,
    getMessages,
    sendMessages,
    loadMoreMessages,
  };
};
