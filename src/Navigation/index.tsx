import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthStack';
import {retrieveAccessToken} from '../Functions/EncryptedStorage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Redux/rootReducers';
import {setLoginTrue} from '../Redux/Slices/IsLogInSlice';

const Navigation = (): JSX.Element => {
  const islogInSlice = useSelector((state: RootState) => state.isLoginSlice);

  const dispatch = useDispatch();

  const getAuth = async () => {
    const token = await retrieveAccessToken();
    if (token) {
      dispatch(setLoginTrue());
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <NavigationContainer>
      {islogInSlice.isLogin ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
