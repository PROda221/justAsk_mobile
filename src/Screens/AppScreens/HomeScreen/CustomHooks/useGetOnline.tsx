import {useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {baseURL} from '../../../../Constants';
import {useProfile} from './useProfile';
import {retrieveAccessToken} from '../../../../Functions/EncryptedStorage';

export const useGetOnline = () => {
  const [socket, setSocket] = useState<Socket>();

  const {profileSuccess, callGetProfileApi} = useProfile();

  useEffect(() => {
    callGetProfileApi();
  }, []);

  useEffect(() => () => {
      if (socket) {
        console.log('disconnect now');
        socket?.disconnect();
      }
    }, [socket]);

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

        newSocket.emit('enterHomeScreen', myUsername);

        setSocket(newSocket);

        // Cleanup when leaving the home screen
      };

      setupSocket();
    }
  }, [profileSuccess?.username]);

  return {
    socket,
  };
};
