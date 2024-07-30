import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import store from './Redux/store.ts';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider} from './useContexts/Theme/ThemeContext.tsx';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import './Components/ActionSheet/sheets.tsx';
import {toastConfig} from './Components/CustomToast/index.tsx';
import * as ScreenOrientation from 'expo-screen-orientation';

const App = (): JSX.Element => {
  useEffect(() => {
    lockOrientation();
    GoogleSignin.configure({
      webClientId:
        '796482409066-7v3dplea2tcuj7sdivnlfskr5aib89dc.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    });
  }, []);

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    );
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemeProvider>
          <Navigation />
          <Toast config={toastConfig} />
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
