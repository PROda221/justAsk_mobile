import {useEffect, useState} from 'react';
import {addEventListener} from '@react-native-community/netinfo';

export const useCheckNet = () => {
  const [internet, setInternet] = useState<boolean | null>(false);

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      setInternet(state.isConnected);
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);

  return {
    net: internet,
  };
};
