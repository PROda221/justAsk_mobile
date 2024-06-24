import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {
  callVerifyOtp,
  resetVerifyOtpResponse,
} from '../../Redux/Slices/VerifyOtpSlice';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

let otpValue = '';

export const useVerifyOtp = (
  navigtion: NativeStackNavigationProp<ParamListBase>,
  screenName: string,
  emailId: string,
) => {
  const verifyOtpSlice = useSelector(
    (state: RootState) => state.verifyOtpSlice,
  );
  const dispatch = useDispatch();

  const callVerifyOtpApi = (data: {emailId: string; otp: string}) => {
    otpValue = data.otp;
    dispatch(callVerifyOtp(data));
  };

  const resetVerifyOtpReducer = () => {
    dispatch(resetVerifyOtpResponse());
  };

  useEffect(() => {
    if (verifyOtpSlice.success) {
      navigtion.navigate(screenName, {emailId, otp: otpValue});
    }
  }, [verifyOtpSlice.success]);

  useEffect(() => {
    if (verifyOtpSlice.error) {
      console.log('error in VerifyOtp :', verifyOtpSlice.error);
    }
  }, [verifyOtpSlice.error]);

  return {
    callVerifyOtpApi,
    resetVerifyOtpReducer,
    verifyOtpLoading: verifyOtpSlice.loading,
    verifyOtpSuccess: verifyOtpSlice.success,
    verifyOtpError: verifyOtpSlice.error,
  };
};