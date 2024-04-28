import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import store from './Redux/store.ts';
import { PaperProvider } from 'react-native-paper';

const App = (): JSX.Element => (
  <Provider store={store}>
    <PaperProvider>
    <Navigation />
    </PaperProvider>
  </Provider>
);

export default App;
