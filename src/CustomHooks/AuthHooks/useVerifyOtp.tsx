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
import content from '../../Assets/Languages/english.json';

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
        text1: `${content.OtpScreen.otpVerified}`,
        text2: verifyOtpSlice.success?.message,
        visibilityTime: 3000,
      });
      navigtion.navigate(screenName, {emailId, otp: otpValue});
      resetVerifyOtpReducer();
    }
  }, [verifyOtpSlice.success]);

  useEffect(() => {
    if (verifyOtpSlice.error) {
      Toast.show({
        type: 'error',
        text1: content.OtpScreen.invalidOtp,
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
