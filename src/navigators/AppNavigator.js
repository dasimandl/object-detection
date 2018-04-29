import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../components/HomeScreen';
import Play from '../components/Game';
import { connect } from 'react-redux';
import { addListener } from '../utils/redux';
import FlipCamera from '../components/Game/FlipCamera';
import { Body, Title } from 'native-base';

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
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#000'

      },
      headerRight: <FlipCamera />,
      headerTitle: 'Scavenger Hunt'
    },
  }
);

export const AppWithNavigationState = props => {
  const { dispatch, nav } = props;
  return <AppNavigator navigation={{ dispatch, state: nav, addListener }} />;
};

const mapState = ({ nav, cameraData: { cameraType } }) => ({ nav, cameraType });
const mapDispatch = null;
export default connect(mapState, mapDispatch)(AppNavigator);
