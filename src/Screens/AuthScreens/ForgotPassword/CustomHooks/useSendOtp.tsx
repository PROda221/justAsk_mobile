import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {callSendOtp, resetSendOtpResponse} from '../../../../Redux/Slices/SendOtpSlice';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const useSendOtp = (
  navigtion: NativeStackNavigationProp<ParamListBase>,
  screenName: string,
) => {
  const sendOtpSlice = useSelector((state: RootState) => state.sendOtpSlice);
  const dispatch = useDispatch();

  const callSendOtpApi = (data: {emailId: string}) => {
    dispatch(callSendOtp(data));
  };

  const resetLoginReducer = () => {
    dispatch(resetSendOtpResponse())
  }


  useEffect(() => {
    if (sendOtpSlice.success) {
      navigtion.navigate(screenName);
    }
  }, [sendOtpSlice.success]);

  useEffect(() => {
    if(sendOtpSlice.error){
        console.log('error in login :', sendOtpSlice.error)
    }
  }, [sendOtpSlice.error])

  return {
    callSendOtpApi,
    resetLoginReducer,
    sendOtpLoading: sendOtpSlice.loading,
    sendOtpSuccess: sendOtpSlice.success,
    sendOtpError: sendOtpSlice.error,
  };
};
