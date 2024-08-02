import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {RootState} from '../../Redux/rootReducers';
import {
  callUnblockUser,
  resetUnblockUserResponse,
} from '../../Redux/Slices/UnblockUserSlice';
import Toast from 'react-native-toast-message';
import {callGetUserProfile} from '../../Redux/Slices/UserProfileSlice';

export const useUnblockUser = (blocked?: string) => {
  const dispatch = useDispatch();
  const unblockUserSlice = useSelector(
    (state: RootState) => state.unblockUserSlice,
  );

  const callUnblockUserApi = () => {
    dispatch(callUnblockUser({blocked}));
  };

  const resetUnblockUser = () => {
    dispatch(resetUnblockUserResponse());
  };

  useEffect(() => {
    if (unblockUserSlice.success) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: unblockUserSlice.success.message,
        visibilityTime: 5000,
      });
      dispatch(callGetUserProfile({username: blocked}));
      resetUnblockUser();
    }
  }, [unblockUserSlice.success]);

  useEffect(() => {
    if (unblockUserSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: unblockUserSlice.error.message,
        visibilityTime: 5000,
      });
      resetUnblockUser();
    }
  }, [unblockUserSlice.error]);

  return {
    callUnblockUserApi,
    resetUnblockUser,
    unblockSuccess: unblockUserSlice.success,
    unblockLoading: unblockUserSlice.loading,
    unblockError: unblockUserSlice.error,
  };
};
