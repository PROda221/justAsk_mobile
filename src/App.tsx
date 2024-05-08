import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import store from './Redux/store.ts';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider} from './useContexts/Theme/ThemeContext.tsx';

const App = (): JSX.Element => (
  <Provider store={store}>
    <PaperProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </PaperProvider>
  </Provider>
);

export default App;
