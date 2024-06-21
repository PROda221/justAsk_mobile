import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  callTokenGenerator,
  resetLoginResponse,
} from '../../Redux/Slices/LoginSlice';
import {storeAccessToken} from '../../Functions/EncryptedStorage';
import {useIsLogin} from './useIsLogin';

export const useLogin = () => {
  const {userLogedIn} = useIsLogin();
  const loginSlice = useSelector((state: RootState) => state.loginSlice);
  const dispatch = useDispatch();

  const callLoginApi = (data: {username: string; password: string}) => {
    dispatch(callTokenGenerator(data));
  };

  const resetLoginReducer = () => {
    dispatch(resetLoginResponse());
  };

  const storeToken = async () => {
    await storeAccessToken(
      loginSlice.success?.access_token ? loginSlice.success.access_token : '',
    );
  };

  useEffect(() => {
    if (loginSlice.success) {
      userLogedIn();
      storeToken();
    }
  }, [loginSlice.success]);

  useEffect(() => {
    if (loginSlice.error) {
      console.log('error in login :', loginSlice.error);
    }
  }, [loginSlice.error]);

  return {
    callLoginApi,
    resetLoginReducer,
    loginLoading: loginSlice.loading,
    loginSuccess: loginSlice.success,
    loginError: loginSlice.error,
  };
};
