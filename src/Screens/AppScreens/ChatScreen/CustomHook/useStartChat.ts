import {useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {baseURL} from '../../../../Constants';
import {useProfile} from '../../HomeScreen/CustomHooks/useProfile';
import {retrieveAccessToken} from '../../../../Functions/EncryptedStorage';

export const useGetOnline = (username: string) => {
  const [socket, setSocket] = useState<Socket>();

  const {profileSuccess, callGetProfileApi} = useProfile();

  useEffect(() => {
    callGetProfileApi();
  }, []);

  useEffect(() => {
    if (profileSuccess?.username) {
      const setupSocket = async () => {
        const getAccessToken = async () => {
          const accessToken = await retrieveAccessToken();
          return accessToken;
        };

        const savedToken = getAccessToken();
        const myUsername = profileSuccess?.username;

        console.log('myUsername is :', myUsername);

        const newSocket = io(baseURL, {
          query: {
            token: savedToken,
            userId: myUsername,
          },
        });

        newSocket.on('connect', () => {
          console.log('Connected to socket server'); // Show yoursel,
        });

        //   NewSocket.on('user status', (userStatus: string) => {
        //     console.log(`on ${myUsername}... ${username} is? :`, userStatus);
        //   });

        newSocket.emit('user status', username, {
          username: myUsername,
          online: true,
        });

        newSocket.on('disconnect', () => {
          console.log('Disconnected from socket server'); // Show yourself offline
        });

        newSocket.on('chat message', async msg => {
          // Await addMessageToChat(userId, msg, true);
          // allMessages = await getAllMessagesForChat(userId);
          // setMessages(()=>allMessages);
          // scrollRef.current.scrollToEnd({ animated: true });
          // addMessageToUser(userId, true, messageInput);
          // addData({text: messageInput, received: true}, userId)
          // console.log('a :', msg);
          // setMessages(prevMessages => [
          //   ...prevMessages,
          //   {id: prevMessages.length, text: msg, received: true},
          // ]);
        });

        setSocket(newSocket);
      };

      setupSocket();
    }
  }, [profileSuccess?.username]);

  return {
    socket,
  };
};
