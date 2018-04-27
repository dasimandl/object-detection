import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import PredictScreen from './screens/PredictScreen';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Prediction: {
      screen: PredictScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {
  componentDidMount = () => {

  };
  render() {
    return <RootStack />;
  }
}
