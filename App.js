import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

import { Provider } from 'react-redux';
import store from './src/store';
import { AppRegistry } from 'react-native';
import AppWithNavigationState from './src/navigators/AppNavigator';
import Expo from 'expo';



export class App extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);

export default App;
