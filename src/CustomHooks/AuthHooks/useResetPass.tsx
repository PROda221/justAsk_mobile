import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootState} from '../../Redux/rootReducers';
import {
  callResetPass,
  resetClearPassResponse,
} from '../../Redux/Slices/ResetPassSlice';

export const useResetPass = (
  navigtion: NativeStackNavigationProp<ParamListBase>,
  screenName: string,
) => {
  const resetPassSlice = useSelector(
    (state: RootState) => state.resetPassSlice,
  );
  const dispatch = useDispatch();

  const callResetPassApi = (data: {
    password: string;
    emailId: string;
    otp: string;
  }) => {
    dispatch(callResetPass(data));
  };

  const resetResetPassReducer = () => {
    dispatch(resetClearPassResponse());
  };

  useEffect(() => {
    if (resetPassSlice.success) {
      navigtion.navigate(screenName);
    }
  }, [resetPassSlice.success]);

  useEffect(() => {
    if (resetPassSlice.error) {
      console.log('error in resetPass :', resetPassSlice.error);
    }
  }, [resetPassSlice.error]);

  return {
    callResetPassApi,
    resetResetPassReducer,
    resetPassLoading: resetPassSlice.loading,
    resetPassSuccess: resetPassSlice.success,
    resetPassError: resetPassSlice.error,
  };
};
