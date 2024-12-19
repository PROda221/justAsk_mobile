import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import store, {persistor} from './Redux/store.ts';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider} from './useContexts/Theme/ThemeContext.tsx';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import './Components/ActionSheet/sheets.tsx';
import {toastConfig} from './Components/CustomToast/index.tsx';
import * as ScreenOrientation from 'expo-screen-orientation';
import {SheetProvider} from 'react-native-actions-sheet';
import notifee from '@notifee/react-native';
import {clearSenderNotifications} from './DB/DBFunctions.js';

const App = (): JSX.Element => {
  useEffect(() => {
    async function initialNoti() {
      const initialNotification = await notifee.getInitialNotification();

      if (initialNotification) {
        await clearSenderNotifications();
        await notifee.cancelAllNotifications();
      }
    }
    initialNoti();
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
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <ThemeProvider>
            <SheetProvider>
              <Navigation />
            </SheetProvider>
            <Toast config={toastConfig} />
          </ThemeProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
