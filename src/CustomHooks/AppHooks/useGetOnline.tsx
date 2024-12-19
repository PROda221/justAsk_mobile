import {useEffect, useRef} from 'react';
import {Socket} from 'socket.io-client';
import {AppState} from 'react-native';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {RootState} from '../../Redux/rootReducers';
import {useDispatch, useSelector} from 'react-redux';
import {callGetProfile} from '../../Redux/Slices/ProfileSlice';
import {useSyncChats} from './useSyncChats';
import {updateReadStatusWebSocket} from '../../DB/DBFunctions';

export const useGetOnline = (socket: Socket | null) => {
  const appState = useRef(AppState.currentState);
  const profileSuccess = useSelector(
    (state: RootState) => state.profileSlice.success,
  );
  const {callSyncChatsApi} = useSyncChats();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callGetProfile());
  }, []);

  useEffect(() => {
    if (profileSuccess?.username) {
      callSyncChatsApi(profileSuccess?.username);
    }
  }, [profileSuccess?.username]);

  const sendAcknowledgment = async (msgsacknowledged: string[]) => {
    socket?.emit('acknowledge receipt', msgsacknowledged);
  };

  useEffect(() => {
    socket?.volatile.on('read receipt', async ({readMsgs}) => {
      const acknowledgedMessages = await updateReadStatusWebSocket(readMsgs);
      sendAcknowledgment(acknowledgedMessages);
    });
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (profileSuccess?.username) {
          callSyncChatsApi(profileSuccess?.username);
        }
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
