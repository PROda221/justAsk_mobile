import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../Redux/rootReducers';
import {callLogout, resetLogoutResponse} from '../../Redux/Slices/LogoutSlice';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {SheetManager} from 'react-native-actions-sheet';

export const useLogout = (onSuccess: () => void) => {
  const dispatch = useDispatch();
  const logoutSlice = useSelector((state: RootState) => state.logoutSlice);

  const callLogoutApi = async () => {
    await SheetManager.hide('AlertBox-sheet');
    dispatch(callLogout());
  };

  const resetLogoutReducer = () => {
    dispatch(resetLogoutResponse());
  };

  useEffect(() => {
    if (logoutSlice.success) {
      resetLogoutReducer();
      onSuccess?.();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: logoutSlice.success.message,
        visibilityTime: 5000,
      });
    }
  }, [logoutSlice.success]);

  useEffect(() => {
    if (logoutSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: logoutSlice.error.message,
        visibilityTime: 5000,
      });
    }
  }, [logoutSlice.error]);

  return {
    callLogoutApi,
    resetLogoutReducer,
    logoutSuccess: logoutSlice.success,
    logoutLoading: logoutSlice.loading,
    logoutError: logoutSlice.error,
  };
};
