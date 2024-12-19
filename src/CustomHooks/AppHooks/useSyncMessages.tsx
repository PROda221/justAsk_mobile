import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {RootState} from '../../Redux/rootReducers';
import {
  callSyncMessages,
  resetSyncMessages,
} from '../../Redux/Slices/SyncMessagesSlice';
import Toast from 'react-native-toast-message';

export const useSyncMessages = () => {
  const dispatch = useDispatch();
  const syncMessagesSlice = useSelector(
    (state: RootState) => state.syncMessagesSlice,
  );

  const callSyncMessagesApi = (
    senderId?: string,
    receiverId?: string,
    messageId?: string,
  ) => {
    dispatch(callSyncMessages({senderId, receiverId, messageId}));
  };

  const resetSyncMessagesReducer = () => {
    dispatch(resetSyncMessages());
  };

  useEffect(() => {
    if (syncMessagesSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: syncMessagesSlice.error.message,
        visibilityTime: 5000,
      });
      resetSyncMessagesReducer();
    }
  }, [syncMessagesSlice.error]);

  return {
    callSyncMessagesApi,
    resetSyncMessagesReducer,
    syncMessagesSuccess: syncMessagesSlice.success,
    syncMessagesLoading: syncMessagesSlice.loading,
    syncMessagesError: syncMessagesSlice.error,
  };
};
