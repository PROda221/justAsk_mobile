import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type RootState} from '../../Redux/rootReducers';
import {
  callCheckUser,
  resetCheckUserResponse,
} from '../../Redux/Slices/CheckUserSlice';

let paramsData: {username: string; password: string; emailId: string};

export const useCheckUser = (
  navigtion: NativeStackNavigationProp<ParamListBase>,
  screenName: string,
) => {
  const checkUserSlice = useSelector(
    (state: RootState) => state.checkUserSlice,
  );
  const dispatch = useDispatch();

  const callCheckUserApi = (data: {
    username: string;
    password: string;
    emailId: string;
  }) => {
    paramsData = data;
    dispatch(callCheckUser(data));
  };

  const resetCheckUserReducer = () => {
    dispatch(resetCheckUserResponse());
  };

  useEffect(() => {
    if (checkUserSlice.success) {
      resetCheckUserReducer();
      navigtion.navigate(screenName, {data: paramsData});
    }
  }, [checkUserSlice.success]);

  useEffect(() => {
    if (checkUserSlice.error) {
      console.log('error in checkUser :', checkUserSlice.error.message);
    }
  }, [checkUserSlice.error]);

  return {
    callCheckUserApi,
    resetCheckUserReducer,
    checkUserLoading: checkUserSlice.loading,
    checkUserSuccess: checkUserSlice.success,
    checkUserError: checkUserSlice.error,
  };
};
