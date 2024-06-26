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

const App = (): JSX.Element => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

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
