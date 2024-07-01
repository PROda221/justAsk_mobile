import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootState} from '../../Redux/rootReducers';
import {
  callResetPass,
  resetClearPassResponse,
} from '../../Redux/Slices/ResetPassSlice';
import Toast from 'react-native-toast-message';

export const useResetPass = (
  navigation: NativeStackNavigationProp<ParamListBase>,
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
      Toast.show({
        type: 'success',
        text1: 'Pass Reset Successful',
        text2: resetPassSlice.success.message,
        visibilityTime: 5000,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'LandingScreen'}, {name: 'Login'}],
        }),
      );
      resetResetPassReducer();
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
