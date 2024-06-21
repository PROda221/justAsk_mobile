import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootState} from '../../Redux/rootReducers';
import {callSignIn, resetSignUpResponse} from '../../Redux/Slices/SignUpSlice';

export const useSignIn = (
  navigtion: NativeStackNavigationProp<ParamListBase>,
  screenName: string,
) => {
  const signUpSlice = useSelector((state: RootState) => state.signUpSlice);
  const dispatch = useDispatch();

  const callSignUpApi = (data: {
    username: string;
    password: string;
    emailId: string;
    adviceGenre: Array<string>;
  }) => {
    dispatch(callSignIn(data));
  };

  const resetSignUpReducer = () => {
    dispatch(resetSignUpResponse());
  };

  useEffect(() => {
    if (signUpSlice.success) {
      console.log('success in signin :', signUpSlice.success);
      resetSignUpReducer();
      navigtion.navigate(screenName);
    }
  }, [signUpSlice.success]);

  useEffect(() => {
    if (signUpSlice.error) {
      console.log('error in login :', signUpSlice.error);
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
