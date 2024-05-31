import {useEffect, useState} from 'react';
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

let allMessages: Model[] = []

export const useStartChat = (
  socket: Socket,
  username: string,
  profilePic: string,
) => {
  const [partnerStatus, setPartnerStatus] = useState('offline');
  const [messages, setMessages] = useState<Model[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const sendMessages = async (messageInput: string, username: string) => {
    socket.emit('chat message', messageInput, username);
  };

  const getMessages = async (msg: string, isReceived: boolean) => {
    try {
      const newMessage = await addMessageToChat(username, msg, isReceived);

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
        allMessages = await getAllMessagesForChat(username, messages.length);
        if(allMessages.length){
          setMessages(allMessages?.slice(0, 20));
        }
      } else {
        await createNewChat(username, username, profilePic);
      }
    } catch (err) {
      console.log('local db error :', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const connectWithUser = async () => {
      const myUsername = profileSlice?.success?.username;
      socket.emit('join', {userId: myUsername, chatPartnerId: username});

      socket.on('statusUpdate', statusUpdate => {
        const {status} = statusUpdate;
        setPartnerStatus(status);
      });

      // Chat with user

      socket.on('chat message', async msg => {
        getMessages(msg, true);
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
