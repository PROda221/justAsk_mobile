import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthStack';
import {retrieveAccessToken} from '../Functions/EncryptedStorage';
import {useIsLogin} from '../CustomHooks/AuthHooks/useIsLogin';

const Navigation = (): JSX.Element => {
  const {isLogedIn, userLogedIn} = useIsLogin();

  const getAuth = async () => {
    const token = await retrieveAccessToken();
    if (token) {
      userLogedIn();
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <NavigationContainer>
      {isLogedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
