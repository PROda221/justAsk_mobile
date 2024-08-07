import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthStack';
import {retrieveAccessToken} from '../Functions/EncryptedStorage';
import {useIsLogin} from '../CustomHooks/AuthHooks/useIsLogin';
import {AnimatedBootSplash} from '../Components/AnimatedSplashScreen';

const Navigation = (): JSX.Element => {
  const {isLogedIn, userLogedIn} = useIsLogin();
  const [animationEnd, setAnimationEnd] = useState(false);

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
      {!animationEnd && (
        <AnimatedBootSplash
          onAnimationEnd={() => {
            setAnimationEnd(true);
          }}
        />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
