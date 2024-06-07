import {useEffect, useRef, useState} from 'react';
import {Socket} from 'socket.io-client';
import {useProfile} from './useProfile';
import {AppState} from 'react-native';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';

export const useGetOnline = (socket: Socket | null) => {
  const appState = useRef(AppState.currentState);

  const {profileSuccess, callGetProfileApi} = useProfile();

  useEffect(() => {
    callGetProfileApi();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        socket?.emit('statusUpdate', profileSuccess?.username, 'online');
      } else {
        appState.current = nextAppState;
        socket?.emit('statusUpdate', profileSuccess?.username, 'offline');
      }
    });

    return () => {
      subscription.remove();
    };
  }, [socket, profileSuccess?.username]);

  return {};
};
