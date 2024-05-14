import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {resetSignUpResponse} from '../../../../Redux/Slices/SignUpSlice';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { callSignIn } from '../../../../Redux/Slices/SignUpSlice';

export const useSignIn = (
  navigtion: NativeStackNavigationProp<ParamListBase>,
  screenName: string,
) => {
  const signUpSlice = useSelector((state: RootState) => state.signUpSlice);
  const dispatch = useDispatch();

  const callSignUpApi = (data: {username: string; password: string; emailId: string}) => {
    const newData = {...data, adviceGenre: ["Psycology", "Financial", "Health & Fitness"]}
    dispatch(callSignIn(newData));
  };

  const resetSignUpReducer = () => {
    dispatch(resetSignUpResponse())
  }


  useEffect(() => {
    if (signUpSlice.success) {
      navigtion.navigate(screenName);
    }
  }, [signUpSlice.success]);

  useEffect(() => {
    if(signUpSlice.error){
        console.log('error in login :', signUpSlice.error)
    }
  }, [signUpSlice.error])

  return {
    callSignUpApi,
    resetSignUpReducer,
    signUpLoading: signUpSlice.loading,
    signUpSuccess: signUpSlice.success,
    signUpError: signUpSlice.error,
  };
};
