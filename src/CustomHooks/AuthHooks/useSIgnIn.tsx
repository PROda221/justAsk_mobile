import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {CommonActions, type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type RootState} from '../../Redux/rootReducers';
import {callSignIn, resetSignUpResponse} from '../../Redux/Slices/SignUpSlice';
import Toast from 'react-native-toast-message';
import {useGoogleLogin} from './useGoogleLogin';
import {googleSignInToken} from '../../Functions/GoogleSignInToken';

export const useSignIn = (
  navigation: NativeStackNavigationProp<ParamListBase>,
  popToScreen: string,
  screenName: string,
  isGoogleLogin?: boolean,
) => {
  const {callGoogleLoginApi} = useGoogleLogin();
  const signUpSlice = useSelector((state: RootState) => state.signUpSlice);
  const dispatch = useDispatch();

  const callSignUpApi = (data: {
    username: string;
    password: string;
    emailId: string;
    adviceGenre: string[];
  }) => {
    dispatch(callSignIn(data));
  };

  const resetSignUpReducer = () => {
    dispatch(resetSignUpResponse());
  };

  useEffect(() => {
    if (signUpSlice.success) {
      if (isGoogleLogin) {
        googleSignInToken().then(token => {
          if (token) {
            callGoogleLoginApi({idToken: token ?? ''});
          }
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: signUpSlice.success.message,
          visibilityTime: 5000,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: popToScreen}, {name: screenName}],
          }),
        );
      }
      resetSignUpReducer();
    }
  }, [signUpSlice.success]);

  useEffect(() => {
    if (signUpSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: signUpSlice.error.message,
        visibilityTime: 5000,
      });
      resetSignUpReducer();
    }
  }, [signUpSlice.error]);

  return {
    callSignUpApi,
    resetSignUpReducer,
    signUpLoading: signUpSlice.loading,
    signUpSuccess: signUpSlice.success,
    signUpError: signUpSlice.error,
  };
};
