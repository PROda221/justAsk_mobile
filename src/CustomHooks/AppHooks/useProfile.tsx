import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../Redux/rootReducers';
import {
  callGetProfile,
  resetProfileResponse,
} from '../../Redux/Slices/ProfileSlice';
import {useEffect} from 'react';
import {getUser, updateOrCreateUser} from '../../DB/DBFunctions';
import {downloadImage} from '../../Functions/DownloadLocalPic';

export const useProfile = (isFocused: boolean = true) => {
  const dispatch = useDispatch();
  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const callGetProfileApi = () => {
    dispatch(callGetProfile());
  };

  const resetProfileReducer = () => {
    dispatch(resetProfileResponse());
  };

  useEffect(() => {
    const fetchUserData = async (username: string) => {
      try {
        let downloadedPic: string | null;
        let currentUser = await getUser(username);
        if (currentUser?.length > 0) {
          // console.log('user inside hook :', currentUser);
          downloadedPic = await downloadImage(
            profileSlice.success?.profilePic ?? '',
            currentUser?.[0]._raw?.['profile_pic'],
          );
        } else {
          downloadedPic = await downloadImage(
            profileSlice.success?.profilePic ?? '',
          );
        }
        let computedImg = {uri: `file://${downloadedPic}`};
        await updateOrCreateUser(
          profileSlice.success,
          downloadedPic ? computedImg.uri : '',
        );
      } catch (err) {
        console.log('err in fetchProfilePic :', err);
      }
    };
    if (profileSlice.success && !profileSlice.loading && isFocused) {
      fetchUserData(profileSlice.success.username);
    }
  }, [profileSlice.success]);

  useEffect(() => {
    if (profileSlice.error && !profileSlice.loading) {
      console.log('error in searchUser :', profileSlice.error);
    }
  }, [profileSlice.error]);

  return {
    callGetProfileApi,
    resetProfileReducer,
    profileSuccess: profileSlice.success,
    profileLoading: profileSlice.loading,
    profileError: profileSlice.error,
  };
};
