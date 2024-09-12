import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {RootState} from '../../Redux/rootReducers';
import {
  callSyncChats,
  Chats,
  resetSyncChats,
} from '../../Redux/Slices/SyncChatsSlice';
import Toast from 'react-native-toast-message';
import {syncChatsToLocal} from '../../Functions/SyncChatsWithLocalStorage';

let yourId = '';

export const useSyncChats = () => {
  const dispatch = useDispatch();
  const syncChatsSlice = useSelector(
    (state: RootState) => state.syncChatsSlice,
  );

  const callSyncChatsApi = (accountUsername: string) => {
    yourId = accountUsername;
    dispatch(callSyncChats({accountUsername}));
  };

  const resetSyncChatsReducer = () => {
    dispatch(resetSyncChats());
  };

  useEffect(() => {
    const syncLocalWithDb = async (data: Chats[]) => {
      await syncChatsToLocal(data, yourId);
    };

    if (syncChatsSlice.success) {
      syncLocalWithDb(syncChatsSlice.success.data);
    }
  }, [syncChatsSlice.success]);

  useEffect(() => {
    if (syncChatsSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: syncChatsSlice.error.message,
        visibilityTime: 5000,
      });
      resetSyncChatsReducer();
    }
  }, [syncChatsSlice.error]);

  return {
    callSyncChatsApi,
    resetSyncChatsReducer,
    syncChatsSuccess: syncChatsSlice.success,
    syncChatsLoading: syncChatsSlice.loading,
    syncChatsError: syncChatsSlice.error,
  };
};
