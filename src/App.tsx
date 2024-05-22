import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import store from './Redux/store.ts';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider} from './useContexts/Theme/ThemeContext.tsx';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import './Components/ActionSheet/sheets.tsx';
import {SheetProvider} from 'react-native-actions-sheet';

const App = (): JSX.Element => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemeProvider>
          <SheetProvider>
            <Navigation />
          </SheetProvider>
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
