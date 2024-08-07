import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthStack';
import {retrieveAccessToken} from '../Functions/EncryptedStorage';
import {useIsLogin} from '../CustomHooks/AuthHooks/useIsLogin';
import BootSplash from 'react-native-bootsplash';
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
    getAuth().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
    getAuth();
  }, []);

  return (
    <NavigationContainer>
      {/* {isLogedIn && animationEnd && (
        <AnimatedBootSplash
          onAnimationEnd={() => {
            setAnimationEnd(true);
          }}
        />
      )} */}

      {isLogedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
