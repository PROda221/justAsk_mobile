import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {resetCheckUserResponse} from '../../../../Redux/Slices/CheckUserSlice';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { callCheckUser } from '../../../../Redux/Slices/CheckUserSlice';

let paramsData: {username: string; password: string; emailId: string}

export const useCheckUser = (
  navigtion: NativeStackNavigationProp<ParamListBase>,
  screenName: string,
) => {
  const checkUserSlice = useSelector((state: RootState) => state.checkUserSlice);
  const dispatch = useDispatch();

  const callCheckUserApi = (data: {username: string; password: string; emailId: string}) => {
    paramsData = data
    dispatch(callCheckUser(data));
  };

  const resetCheckUserReducer = () => {
    dispatch(resetCheckUserResponse())
  }


  useEffect(() => {
    if (checkUserSlice.success) {
      resetCheckUserReducer()
      navigtion.navigate(screenName, {data: paramsData});
    }
  }, [checkUserSlice.success]);

  useEffect(() => {
    if(checkUserSlice.error){
        console.log('error in login :', checkUserSlice.error)
    }
  }, [checkUserSlice.error])

  return {
    callCheckUserApi,
    resetCheckUserReducer,
    checkUserLoading: checkUserSlice.loading,
    checkUserSuccess: checkUserSlice.success,
    checkUserError: checkUserSlice.error,
  };
};
