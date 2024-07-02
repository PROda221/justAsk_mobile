import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type RootState} from '../../Redux/rootReducers';
import {
  callCheckUsername,
  resetCheckUsernameResponse,
} from '../../Redux/Slices/CheckUserSlice';

let paramsData: {username: string; password: string; emailId: string};

export const useCheckUsername = (
  navigtion: NativeStackNavigationProp<ParamListBase>,
  screenName: string,
) => {
  const checkUsernameSlice = useSelector(
    (state: RootState) => state.checkUserSlice.checkUsername,
  );
  const dispatch = useDispatch();

  const callCheckUsernameApi = (data: {
    username: string;
    password: string;
    emailId: string;
  }) => {
    paramsData = data;
    dispatch(callCheckUsername({username: data.username}));
  };

  const resetCheckUsernameReducer = () => {
    dispatch(resetCheckUsernameResponse());
  };

  useEffect(() => {
    if (checkUsernameSlice.success) {
      resetCheckUsernameReducer();
      navigtion.navigate(screenName, {data: paramsData});
    }
  }, [checkUsernameSlice.success]);

  useEffect(() => {
    if (checkUsernameSlice.error) {
      console.log('error in checkUser :', checkUsernameSlice.error.message);
    }
  }, [checkUsernameSlice.error]);

  return {
    callCheckUsernameApi,
    resetCheckUsernameReducer,
    checkUsernameLoading: checkUsernameSlice.loading,
    checkUsernameSuccess: checkUsernameSlice.success,
    checkUsernameError: checkUsernameSlice.error,
  };
};
