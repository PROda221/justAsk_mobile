import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../Redux/rootReducers';
import {
  callActivateAccount,
  resetActivateAccountResponse,
} from '../../Redux/Slices/ActivateSlice';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {SheetManager} from 'react-native-actions-sheet';
import {useLogout} from './useLogout';
import {resetAccessToken} from '../../Functions/EncryptedStorage';
import {useLogin} from '../AuthHooks/useLogin';
import {useGoogleLogin} from '../AuthHooks/useGoogleLogin';
import {useIsLogin} from '../AuthHooks/useIsLogin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import content from '../../Assets/Languages/english.json';

export const useActivateAccount = (
  deactivated: boolean = false,
  callProfileApi: () => void,
) => {
  const {callLogoutApi, logoutLoading} = useLogout(logout);
  const {resetLoginReducer} = useLogin();
  const {resetGoogleLoginReducer} = useGoogleLogin();
  const {userLogedOut} = useIsLogin();
  const dispatch = useDispatch();
  const activateAccountSlice = useSelector(
    (state: RootState) => state.activateAccountSlice,
  );

  async function logout() {
    await resetAccessToken();
    resetLoginReducer();
    resetGoogleLoginReducer();
    await GoogleSignin.signOut();
    userLogedOut();
  }

  const callActivateAccountApi = async () => {
    await SheetManager.hide('AlertBox-sheet');
    dispatch(callActivateAccount());
  };

  const resetActivateAccountReducer = () => {
    dispatch(resetActivateAccountResponse());
  };

  useEffect(() => {
    if (deactivated) {
      SheetManager.show('AlertBox-sheet', {
        payload: {
          title: content.AlertBox.accountDeactivated,
          description: content.AlertBox.yourAccountDeactivatedDec,
          onPressOk: callActivateAccountApi,
          onPressCancel: callLogoutApi,
          confirmCustomName: 'Reactivate',
          cancelCustomName: 'Logout',
        },
      });
    }
  }, [deactivated]);

  useEffect(() => {
    if (activateAccountSlice.success) {
      resetActivateAccountReducer();
      callProfileApi();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: activateAccountSlice.success.message,
        visibilityTime: 5000,
      });
    }
  }, [activateAccountSlice.success]);

  useEffect(() => {
    if (activateAccountSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: activateAccountSlice.error.message,
        visibilityTime: 5000,
      });
    }
  }, [activateAccountSlice.error]);

  return {
    callActivateAccountApi,
    resetActivateAccountReducer,
    ActivateSuccess: activateAccountSlice.success,
    ActivateLoading: activateAccountSlice.loading,
    ActivateError: activateAccountSlice.error,
    ActivateLogoutLoading: logoutLoading,
  };
};
