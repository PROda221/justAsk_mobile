import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {RootState} from '../../Redux/rootReducers';
import {
  callBlockUser,
  resetBlockUserResponse,
} from '../../Redux/Slices/BlockUserSlice';
import Toast from 'react-native-toast-message';
import {callGetUserProfile} from '../../Redux/Slices/UserProfileSlice';

export const useBlockUser = (blocked?: string) => {
  const dispatch = useDispatch();
  const blockUserSlice = useSelector(
    (state: RootState) => state.blockUserSlice,
  );

  const callBlockUserApi = () => {
    dispatch(callBlockUser({blocked}));
  };

  const resetBlockUser = () => {
    dispatch(resetBlockUserResponse());
  };

  useEffect(() => {
    if (blockUserSlice.success) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: blockUserSlice.success.message,
        visibilityTime: 5000,
      });
      dispatch(callGetUserProfile({username: blocked}));
      resetBlockUser();
    }
  }, [blockUserSlice.success]);

  useEffect(() => {
    if (blockUserSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: blockUserSlice.error.message,
        visibilityTime: 5000,
      });
      resetBlockUser();
    }
  }, [blockUserSlice.error]);

  return {
    callBlockUserApi,
    resetBlockUser,
    blockSuccess: blockUserSlice.success,
    blockLoading: blockUserSlice.loading,
    blockError: blockUserSlice.error,
  };
};
