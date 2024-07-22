import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  callGetUserProfile,
  resetUserProfileResponse,
} from '../../Redux/Slices/UserProfileSlice';
import {useEffect} from 'react';
import {updateChatData} from '../../DB/DBFunctions';
import {useProfile} from './useProfile';
import {downloadImage} from '../../Functions/UpdateLocalPic';

export const useUserProfile = (username?: string, image?: string) => {
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
    const fetchUserData = async () => {
      try {
        const profilePic = await downloadImage(
          userProfileSlice.success?.response.userDetails.profilePic ?? '',
          image,
        );
        let computedImg = {uri: `file://${profilePic}`};
        updateChatData(
          userProfileSlice.success?.response.userDetails,
          profileSuccess?.username,
          profilePic ? computedImg.uri : '',
        );
      } catch (err) {
        console.log('err in fetchProfilePic :', err);
      }
    };

    if (userProfileSlice.success) {
      fetchUserData();
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
