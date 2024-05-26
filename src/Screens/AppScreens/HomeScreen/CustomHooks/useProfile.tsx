import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {
  callGetProfile,
  resetProfileResponse,
} from '../../../../Redux/Slices/ProfileSlice';
import {useEffect} from 'react';

export const useProfile = () => {
  const dispatch = useDispatch();
  const profileSlice = useSelector((state: RootState) => state.profileSlice);

  const callGetProfileApi = () => {
    dispatch(callGetProfile());
  };

  const resetProfileReducer = () => {
    dispatch(resetProfileResponse());
  };

  useEffect(() => {
    if (profileSlice.success) {
      console.log('success is :', profileSlice.success);
    }
  }, [profileSlice.success]);

  useEffect(() => {
    if (profileSlice.error) {
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
