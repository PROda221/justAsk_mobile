import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {RootState} from '../../Redux/rootReducers';
import {
  callMultiUnblock,
  resetMultiUnblockResponse,
} from '../../Redux/Slices/MultiUnblockSlice';
import Toast from 'react-native-toast-message';
import {unblockChats} from '../../DB/DBFunctions';

export const useMultiUnblock = (
  handleUnblockSuccess?: () => void,
  selectedUsers: string[],
  accountName: string,
) => {
  const dispatch = useDispatch();
  const multiUnblockSlice = useSelector(
    (state: RootState) => state.multiUnblockSlice,
  );

  const callMultiUnblockApi = (data: string[]) => {
    dispatch(callMultiUnblock({blocked: data}));
  };

  const resetAllBlockedReducer = () => {
    dispatch(resetMultiUnblockResponse());
  };

  useEffect(() => {
    const handleUnblock = async () => {
      if (multiUnblockSlice.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: multiUnblockSlice.success.message,
          visibilityTime: 5000,
        });
        handleUnblockSuccess?.();
        await unblockChats([...selectedUsers], accountName);
        resetAllBlockedReducer();
      }
    };

    handleUnblock();
  }, [multiUnblockSlice.success]);

  useEffect(() => {
    if (multiUnblockSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: multiUnblockSlice.error.message,
        visibilityTime: 5000,
      });
    }
  }, [multiUnblockSlice.error]);

  return {
    callMultiUnblockApi,
    resetAllBlockedReducer,
    multiUnblockSuccess: multiUnblockSlice.success,
    multiUnblockLoading: multiUnblockSlice.loading,
    multiUnblockError: multiUnblockSlice.error,
  };
};
