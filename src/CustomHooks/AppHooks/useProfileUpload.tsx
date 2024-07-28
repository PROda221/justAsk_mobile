import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  callProfileUpload,
  resetProfileUploadResponse,
} from '../../Redux/Slices/ProfileUpload';
import {useEffect} from 'react';
import {callGetProfile} from '../../Redux/Slices/ProfileSlice';
import Toast from 'react-native-toast-message';

export const useProfileUpload = () => {
  const dispatch = useDispatch();
  const profileUploadSlice = useSelector(
    (state: RootState) => state.profileUpload,
  );

  const callProfileUploadApi = (data: {
    filePath?: string | null;
    currentPath?: string | null;
    string?: string | null;
  }) => {
    dispatch(callProfileUpload(data));
  };

  const resetProfileUploadReducer = () => {
    dispatch(resetProfileUploadResponse());
  };

  useEffect(() => {
    if (profileUploadSlice.success) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: profileUploadSlice.success.message,
        visibilityTime: 3000,
      });
      resetProfileUploadReducer();
      dispatch(callGetProfile());
    }
  }, [profileUploadSlice.success]);

  useEffect(() => {
    if (profileUploadSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: profileUploadSlice.error.message,
        visibilityTime: 3000,
      });
    }
  }, [profileUploadSlice.error]);

  return {
    callProfileUploadApi,
    resetProfileUploadReducer,
    profileUploadSuccess: profileUploadSlice.success,
    profileUploadLoading: profileUploadSlice.loading,
    profileUploadError: profileUploadSlice.error,
  };
};
