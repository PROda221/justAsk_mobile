import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  callGetUserProfile,
  resetUserProfileResponse,
} from '../../Redux/Slices/UserProfileSlice';
import {useEffect} from 'react';
import {updateChatData} from '../../DB/DBFunctions';
import {useProfile} from './useProfile';

export const useUserProfile = (username?: string) => {
  const dispatch = useDispatch();
  const {profileSuccess} = useProfile();
  const userProfileSlice = useSelector(
    (state: RootState) => state.userProfileSlice,
  );

  const callGetUserProfileApi = () => {
    dispatch(callGetUserProfile({username}));
  };

  const resetUserProfileReducer = () => {
    dispatch(resetUserProfileResponse());
  };

  useEffect(() => {
    if (userProfileSlice.success) {
      updateChatData(
        userProfileSlice.success.response.userDetails,
        profileSuccess?.username,
      );
      console.log('success is :', userProfileSlice.success);
    }
  }, [userProfileSlice.success]);

  useEffect(() => {
    if (userProfileSlice.error) {
      console.log('error in searchUser :', userProfileSlice.error);
    }
  }, [userProfileSlice.error]);

  return {
    callGetUserProfileApi,
    resetUserProfileReducer,
    userProfileSuccess: userProfileSlice.success?.response.userDetails,
    userProfileLoading: userProfileSlice.loading,
    userProfileError: userProfileSlice.error,
  };
};
