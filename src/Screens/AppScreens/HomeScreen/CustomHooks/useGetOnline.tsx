import {useCallback, useEffect, useRef, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {baseURL} from '../../../../Constants';
import {useProfile} from './useProfile';
import {retrieveAccessToken} from '../../../../Functions/EncryptedStorage';
import {AppState} from 'react-native';
import { getAllChats } from '../../../../DB/DBFunctions';
import { _RawRecord } from '@nozbe/watermelondb/RawRecord';
import { useFocusEffect } from '@react-navigation/native';

export const useGetOnline = () => {
  const [socket, setSocket] = useState<Socket>();
  const [activeChats, setActiveChats] = useState<_RawRecord[]>([]);
  const appState = useRef(AppState.currentState);

  const {profileSuccess, callGetProfileApi} = useProfile();

  const fetchAllChatsFromDb = async () => {
    const allChats = await getAllChats();
    console.log('flashlist data')
    setActiveChats(allChats);
  };

  const setupSocket = async () => {
    const getAccessToken = async () => {
      const accessToken = await retrieveAccessToken();
      return accessToken;
    };

    const savedToken = getAccessToken();
    const myUsername = profileSuccess?.username;

    const newSocket = io(baseURL, {
      query: {
        token: savedToken,
        userId: myUsername,
      },
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket server'); // Show yoursel,
    });

    setSocket(newSocket);

    // Cleanup when leaving the home screen
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllChatsFromDb();
    }, [socket]),
  );

  useEffect(() => {
    callGetProfileApi();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('forground')
        socket?.emit('statusUpdate', profileSuccess?.username, 'online');
        fetchAllChatsFromDb()
      } else {
        console.log('background')
        appState.current = nextAppState;
        socket?.emit('statusUpdate', profileSuccess?.username, 'offline');
      }
    });

    return () => {
      if (socket) {
        console.log('disconnect now');
        socket?.disconnect();
      }
      subscription.remove();
    };
  }, [socket]);

  useEffect(() => {
    if (profileSuccess?.username) {
      setupSocket();
    }
  }, [profileSuccess?.username]);

  return {
    socket,
    activeChats
  };
};
