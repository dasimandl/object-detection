import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../components/HomeScreen';
import Play from '../components/Game';
import { connect } from 'react-redux';
import { addListener } from '../utils/redux';
import { FlipCamera } from '../components/Game/FlipCamera';
import { updateType } from '../store';

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
      },
      headerRight: <FlipCamera test='test'/>,
    },
  }
);

export const AppWithNavigationState = props => {
  const { dispatch, nav, updateCameraType, cameraType } = props;
  return (
    <AppNavigator
      updateCameraType={updateCameraType}
      cameraType={cameraType}
      navigation={{ dispatch, state: nav, addListener }}
    />
  );
};

const mapState = ({ nav, cameraData: { cameraType } }) => ({ nav, cameraType });
const mapDispatch = dispatch => ({
  updateCameraType(type) {
    return dispatch(updateType(type));
  },
});

export default connect(mapState, mapDispatch)(AppNavigator);
