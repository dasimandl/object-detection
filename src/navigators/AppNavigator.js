import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../components/HomeScreen';
import PredictScreen from '../components/PredictScreen';
import { connect } from 'react-redux';
import { addListener } from '../utils/redux';

export const AppNavigator = StackNavigator(
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

export const AppWithNavigationState = props => {
  const { dispatch, nav } = props;
  return <AppNavigator navigation={{ dispatch, state: nav, addListener }} />;
};

const mapState = ({ nav }) => ({ nav });

export default connect(mapState, null)(AppNavigator);
