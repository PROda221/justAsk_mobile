import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  addMessageToChat,
  checkChatExists,
  createNewChat,
  getMessagesForChat,
  getLatestMessageForChat,
  storeSyncedMessages,
  updateReadStatus,
} from '../../DB/DBFunctions';
import {Model} from '@nozbe/watermelondb';
import {AppState} from 'react-native';
import {useSocket} from '../../useContexts/SocketContext';
import {useSyncMessages} from './useSyncMessages';
import {MessageObj} from '../../Redux/Slices/SyncMessagesSlice';
import NetInfo from '@react-native-community/netinfo';
import SoundPlayer from 'react-native-sound-player'
import {debounce} from 'lodash';
import { forwardMsgType } from '../../Screens/AppScreens/ChatScreen/types';

let allMessages: Model[] = [];

export const useStartChat = (
  username: string,
  profilePic: string,
  newMessage: any,
  skills: Array<string>,
  status: string,
) => {
  const [partnerStatus, setPartnerStatus] = useState('offline');
  const [messages, setMessages] = useState<Model[]>([]);
  const [chatId, setChatId] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const appState = useRef(AppState.currentState);
  const wasConnected = useRef(false);
  const initialMount = useRef(true);
  const {socket} = useSocket();
  const {
    callSyncMessagesApi,
    syncMessagesSuccess,
    resetSyncMessagesReducer,
    syncMessagesLoading,
  } = useSyncMessages();

  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const sendAcknowledgment = async (msgsacknowledged: string[]) => {
    socket?.emit(
      'acknowledge receipt',
      msgsacknowledged,
    );
  }

  const sendMessages = async (
    messageInput: string,
    username: string,
    type: string = 'message',
    messageId: string,
    forwardMsg?: forwardMsgType
  ) => {
    SoundPlayer.playSoundFile('outgoing_sound', 'wav')
    socket?.volatile.emit(
      'chat message',
      messageInput,
      profileSlice.success?.username,
      username,
      type,
      profileSlice.success?.profilePic,
      messageId,
      forwardMsg
    );
  };

  const getMessages = async (
    msg: string | object,
    isReceived: boolean,
    type: string = 'message',
    forwardMsg?: forwardMsgType
  ) => {
    try {
      newMessage = await addMessageToChat({
        chatId: username,
        account: profileSlice.success?.username,
        text: msg,
        isReceived: isReceived,
        type,
        onChatScreen: true,
        forwardMsg
      });
      setMessages(prevMessages => [newMessage, ...prevMessages]);
      SoundPlayer.playSoundFile('incoming_sound', 'wav')
      return newMessage;
    } catch (err) {
      console.log('err on getMessage in useStartChat:', err);
    }
  };

  const loadMoreMessages = async () => {
    if (hasMore && allMessages.length && messages?.length) {
      const lastMessageId = messages[messages.length - 1]?.id;
  
      const {localStoredMsgs} = await getMessagesForChat(
        username,
        profileSlice.success?.username,
        lastMessageId ?? '',
      );
  
      if (localStoredMsgs.length > 0) {
        setMessages(prevMessages => [...prevMessages, ...localStoredMsgs]);
      }
  
      if (localStoredMsgs.length < 50) {
        setHasMore(false); // No more messages to load
      }
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
        const {localStoredMsgs, chatId} = await getMessagesForChat(
          username,
          profileSlice.success?.username,
        );
        allMessages = localStoredMsgs;
        setChatId(chatId);
        if (allMessages.length) {
          setMessages(allMessages);
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
      initialMount.current = false;
    } catch (err) {
      console.log('local db error :', err);
    }
  };

  const debouncedFetchMessages = debounce(() => {
    fetchMessages(); // Your fetch logic here
  }, 2000);

  useEffect(() => {
    const getMessages = async (data: MessageObj) => {
      if (data) {
        let newMessages: Model[] = [];
        newMessages = await storeSyncedMessages(
          profileSlice.success?.username,
          username,
          data.newMessages,
        );
        const msgsacknowledged = await updateReadStatus(data.unacknowledgedReadReceipts)
        sendAcknowledgment(msgsacknowledged)
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
        debouncedFetchMessages(); // Fetch messages after the app is back
      } else {
        appState.current = nextAppState;
      }
    });
    const networkSubscription = NetInfo.addEventListener(state => {
      if (state.isConnected && !wasConnected.current && !initialMount.current) {
        wasConnected.current = true;
        fetchMessages();
      } else if (!state.isConnected) {
        wasConnected.current = false; // Reset connection status when offline
      }
    });

    return () => {
      networkSubscription();
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
    const connectWithUser = async () => {
      const myUsername = profileSlice?.success?.username;
      socket?.emit('join', {userId: myUsername, chatPartnerId: username});

      socket?.on('statusUpdate', statusUpdate => {
        const {status} = statusUpdate;
        setPartnerStatus(status);
      });
    };

    fetchMessages();
    connectWithUser();
  }, [username]);

  return {
    partnerStatus,
    messages,
    syncMessagesLoading,
    hasMore,
    getMessages,
    sendMessages,
    loadMoreMessages,
  };
};
