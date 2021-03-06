import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '50%',
    justifyContent: 'center',
  },
});

export class HomeScreen extends Component {
  componentWillMount() {
    StatusBar.setHidden(false);
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <ImageBackground
        source={require('../../assets/background.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>Scavenger Hunt</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Play')}
          >
            <Text style={{fontSize: 20}}>Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const mapState = ({
  cameraData: { hasCameraPermission, cameraType },
  predictions,
}) => ({
  hasCameraPermission,
  cameraType,
  predictions,
});
const mapDispatch = dispatch => ({});
export default connect(mapState, mapDispatch)(HomeScreen);
