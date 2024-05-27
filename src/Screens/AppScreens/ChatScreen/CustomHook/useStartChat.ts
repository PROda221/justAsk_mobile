import {useEffect, useState} from 'react';
import {Socket} from 'socket.io-client';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {
  checkChatExists,
  createNewChat,
  getAllMessagesForChat,
} from '../../../../DB/DBFunctions';

export const useStartChat = (socket: Socket, username: string, profilePic: string) => {
  const [partnerStatus, setPartnerStatus] = useState('offline');

  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const fetchMessages = async () => {
    try {
      const chatExists = await checkChatExists(username);
      if (chatExists) {
        const allMessages = await getAllMessagesForChat(username);
        console.log('all messages :', allMessages)
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
        const {userId: partnerId, status} = statusUpdate;
        if (partnerId === username) {
          setPartnerStatus(status);
        }
      });
    };

    connectWithUser();
  }, [username]);

  return {
    partnerStatus,
  };
};
