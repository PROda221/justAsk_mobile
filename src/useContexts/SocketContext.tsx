import React, {createContext, useContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {retrieveAccessToken} from '../Functions/EncryptedStorage';
import {useGetOnline} from '../Screens/AppScreens/HomeScreen/CustomHooks/useGetOnline';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {useGetMessage} from '../Screens/AppScreens/ChatScreen/CustomHook/useGetMessage';

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  newMessage: any;
}

// Create the context
const SocketContext = createContext<SocketContextType>({
  socket: null,
  newMessage: '',
});

// Custom hook to access the socket context
export const useSocket = () => useContext(SocketContext);

// SocketProvider component to wrap your app with
export const SocketProvider: React.FC<{
  url: string;
  children: React.ReactNode;
}> = ({url, children}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [token, setToken] = useState<string | null>('');

  const getAccessToken = async () => {
    const accessToken = await retrieveAccessToken();
    setToken(accessToken);
  };

  useGetOnline(socket);
  const {newMessage} = useGetMessage(socket);

  useEffect(() => {
    getAccessToken();
    // Connect to the socket server
    const newSocket = io(url, {
      query: {
        token: token,
      },
    });

    // Set the socket object to state
    setSocket(newSocket);

    // Cleanup function to disconnect the socket when unmounting
    return () => {
      newSocket.disconnect();
    };
  }, [url, token]);

  return (
    <SocketContext.Provider value={{socket, newMessage}}>
      {children}
    </SocketContext.Provider>
  );
};
