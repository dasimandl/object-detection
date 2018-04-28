import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../components/HomeScreen';
import Play from '../components/Game';
import { connect } from 'react-redux';
import { addListener } from '../utils/redux';

export const AppNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Play: {
      screen: Play,
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
