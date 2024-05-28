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
import { Model } from '@nozbe/watermelondb';

let allMessages: Model[];

export const useStartChat = (socket: Socket, username: string, profilePic: string) => {
  const [partnerStatus, setPartnerStatus] = useState('offline');
  const [messages, setMessages] = useState<Model[]>([])

  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const sendMessages = async (messageInput: string, username: string) => {
    socket.emit('chat message', messageInput, username);
  }

  const getMessages = async (msg: string, isReceived: boolean) => {
    await addMessageToChat(username, msg, isReceived);
    console.log('in sent')

        allMessages = await getAllMessagesForChat(username);
        setMessages(()=>allMessages);

        // scrollRef.current.scrollToEnd({ animated: true });

        // addMessageToUser(userId, true, messageInput);
        // addData({text: messageInput, received: true}, userId)

        // setMessages(prevMessages => [
        //   ...prevMessages,
        //   {id: prevMessages.length, text: msg, received: true},
        // ]);
  }

  const fetchMessages = async () => {
    try {
      const chatExists = await checkChatExists(username);
      if (chatExists) {
        const allMessages = await getAllMessagesForChat(username);
        setMessages(allMessages)
        // setMessages(() => allMessages);
      } else {
        await createNewChat(username, username, profilePic);
      }
    } catch (err) {
      console.log('local db error :', err);
    }
  };

  useEffect(() => {
    console.log('partnerStatus :', partnerStatus);
  }, [partnerStatus]);

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
        console.log('in receive')
        getMessages(msg, true)

      });
    };

    connectWithUser();
  }, [username]);

  return {
    partnerStatus,
    messages,
    getMessages,
    sendMessages
  };
};
