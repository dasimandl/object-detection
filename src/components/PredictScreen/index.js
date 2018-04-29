import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button
} from 'react-native';
import { Camera, Permissions } from 'expo';

export default class PredictScreen extends React.Component {

  render() {
    return (
      <View>
        <Text>PredictScreen</Text>
        <Button
          title="Go Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 50,
  },
});
