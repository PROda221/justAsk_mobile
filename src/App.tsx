import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import store from './Redux/store.ts';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider} from './useContexts/Theme/ThemeContext.tsx';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import './Components/ActionSheet/sheets.tsx';
import Constants from 'expo-constants';
import { registerRootComponent } from 'expo';



const App = (): JSX.Element => {
  console.log(Constants.systemFonts);
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
};

registerRootComponent(App);


export default App;
