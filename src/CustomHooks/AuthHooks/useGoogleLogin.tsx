import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../Redux/rootReducers';
import {
  callGoogleTokenGenerator,
  resetGoogleLoginResponse,
} from '../../Redux/Slices/GoogleLoginSlice';
import {storeAccessToken} from '../../Functions/EncryptedStorage';
import {useIsLogin} from './useIsLogin';
import Toast from 'react-native-toast-message';
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

export const useGoogleLogin = (
  navigation: NativeStackNavigationProp<ParamListBase>,
) => {
  const {userLogedIn} = useIsLogin();
  const googleLoginSlice = useSelector(
    (state: RootState) => state.googleLoginSlice,
  );
  const dispatch = useDispatch();

  const callGoogleLoginApi = (data: {idToken: string}) => {
    dispatch(callGoogleTokenGenerator(data));
  };

  const resetGoogleLoginReducer = () => {
    dispatch(resetGoogleLoginResponse());
  };

  useEffect(() => {
    const storeTokenAsync = async () => {
      if (googleLoginSlice.success) {
        if (googleLoginSlice.success?.access_token) {
          userLogedIn();
          await storeAccessToken(
            googleLoginSlice.success?.access_token
              ? googleLoginSlice.success.access_token
              : '',
          );
        } else {
          navigation.navigate('Set Username', {
            emailId: googleLoginSlice.success?.googleData?.email,
            uid: googleLoginSlice.success?.googleData?.uid,
          });
        }

        resetGoogleLoginReducer();
      }
    };

    void storeTokenAsync();
  }, [googleLoginSlice.success]);

  useEffect(() => {
    if (googleLoginSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: googleLoginSlice.error?.message ?? '',
        visibilityTime: 5000,
      });
    }
  }, [googleLoginSlice.error]);

  return {
    callGoogleLoginApi,
    resetGoogleLoginReducer,
    googleLoginLoading: googleLoginSlice.loading,
    googleLoginSuccess: googleLoginSlice.success,
    googleLoginError: googleLoginSlice.error,
  };
};
