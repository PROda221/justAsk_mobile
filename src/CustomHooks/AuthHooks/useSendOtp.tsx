import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootState} from '../../Redux/rootReducers';
import {
  callSendOtp,
  resetSendOtpResponse,
} from '../../Redux/Slices/SendOtpSlice';

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
      }
    }
  }, [sendOtpSlice.success]);

  useEffect(() => {
    if (sendOtpSlice.error) {
      console.log('error in login :', sendOtpSlice.error);
    }
  }, [sendOtpSlice.error]);

  return {
    callSendOtpApi,
    resetSendOtpReducer,
    sendOtpLoading: sendOtpSlice.loading,
    sendOtpSuccess: sendOtpSlice.success,
    sendOtpError: sendOtpSlice.error,
  };
};
