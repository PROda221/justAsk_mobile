import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {callTokenGenerator, resetLoginResponse} from '../../../../Redux/Slices/LoginSlice';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const useLogin = (
  navigtion: NativeStackNavigationProp<ParamListBase>,
  screenName: string,
) => {
  const loginSlice = useSelector((state: RootState) => state.loginSlice);
  const dispatch = useDispatch();

  const callLoginApi = (data: {username: string; password: string}) => {
    dispatch(callTokenGenerator(data));
  };

  const resetLoginReducer = () => {
    dispatch(resetLoginResponse())
  }


  useEffect(() => {
    if (loginSlice.success) {
      navigtion.navigate(screenName);
    }
  }, [loginSlice.success]);

  useEffect(() => {
    if(loginSlice.error){
        console.log('error in login :', loginSlice.error)
    }
  }, [loginSlice.error])

  return {
    callLoginApi,
    resetLoginReducer,
    loginLoading: loginSlice.loading,
    loginSuccess: loginSlice.success,
    loginError: loginSlice.error,
  };
};
