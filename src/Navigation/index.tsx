import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthStack';
import {retrieveAccessToken} from '../Functions/EncryptedStorage';
import {useIsLogin} from '../CustomHooks/AuthHooks/useIsLogin';

const Navigation = (): JSX.Element => {
  const {isLogedIn, userLogedIn} = useIsLogin();

  useEffect(() => {
    const getAuth = async () => {
      const token = await retrieveAccessToken();
      if (token) {
        userLogedIn();
      }
    };
    getAuth();
  }, []);

  return (
    <NavigationContainer>
      {isLogedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
