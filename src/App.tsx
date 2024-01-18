import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import store from './Redux/store.ts';

const App = (): JSX.Element => <Provider store={store}><Navigation /></Provider>;

export default App;
