import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthStack';
import {retrieveAccessToken} from '../Functions/EncryptedStorage';
import { useLogin } from '../Screens/AuthScreens/Login/CustomHooks/useLogin';




const Navigation = (): JSX.Element => {
  const {loginSuccess} = useLogin()
  const [auth, setAuth] =
    useState<string | null>();

  const getAuth = async () => {
    const token = await retrieveAccessToken();
    setAuth(token);
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <NavigationContainer>
	
      {loginSuccess?.access_token || auth ? <AppNavigation /> : <AuthNavigation />}

    </NavigationContainer>
  );
};

export default Navigation;
