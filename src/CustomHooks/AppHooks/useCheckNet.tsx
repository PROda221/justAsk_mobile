import {useEffect, useState} from 'react';
import {addEventListener} from '@react-native-community/netinfo';
import {SheetManager} from 'react-native-actions-sheet';

export const useCheckNet = () => {
  const [internet, setInternet] = useState<boolean | null>(false);

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      setInternet(state.isConnected);
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!internet) {
      SheetManager.show('NoInternet-sheet');
    } else {
      SheetManager.hide('NoInternet-sheet');
    }
  }, [internet]);

  return {
    net: internet,
  };
};
