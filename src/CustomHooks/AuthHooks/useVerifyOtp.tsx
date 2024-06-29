import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../Redux/rootReducers';
import {
  callVerifyOtp,
  resetVerifyOtpResponse,
} from '../../Redux/Slices/VerifyOtpSlice';
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: 'success',
        text1: 'Verified',
        text2: verifyOtpSlice.success?.message,
        visibilityTime: 3000,
      });
      navigtion.navigate(screenName, {emailId, otp: otpValue});
    }
  }, [verifyOtpSlice.success]);

  useEffect(() => {
    if (verifyOtpSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: verifyOtpSlice.error?.message,
        visibilityTime: 3000,
      });
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
