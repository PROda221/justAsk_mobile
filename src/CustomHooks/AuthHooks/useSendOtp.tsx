import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type RootState} from '../../Redux/rootReducers';
import {
  callSendOtp,
  resetSendOtpResponse,
} from '../../Redux/Slices/SendOtpSlice';
import Toast from 'react-native-toast-message';

export const useSendOtp = (
  navigtion?: NativeStackNavigationProp<ParamListBase>,
  screenName?: string,
  paramsData?: string,
) => {
  const sendOtpSlice = useSelector((state: RootState) => state.sendOtpSlice);
  const dispatch = useDispatch();

  const callSendOtpApi = (data: {emailId: string}) => {
    dispatch(callSendOtp(data));
  };

  const resetSendOtpReducer = () => {
    dispatch(resetSendOtpResponse());
  };

  useEffect(() => {
    if (sendOtpSlice.success) {
      if (navigtion && screenName) {
        resetSendOtpReducer();
        navigtion.navigate?.(screenName, {emailId: paramsData});
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: sendOtpSlice.success.message,
          visibilityTime: 5000,
        });
      }
    }
  }, [sendOtpSlice.success]);

  // useEffect(() => {
  //   if (sendOtpSlice.error) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: sendOtpSlice.error.message,
  //       visibilityTime: 5000,
  //     });
  //     resetSendOtpReducer();
  //   }
  // }, [sendOtpSlice.error]);

  return {
    callSendOtpApi,
    resetSendOtpReducer,
    sendOtpLoading: sendOtpSlice.loading,
    sendOtpSuccess: sendOtpSlice.success,
    sendOtpError: sendOtpSlice.error,
  };
};
