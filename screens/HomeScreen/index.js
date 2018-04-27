import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  FlatList
} from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
const Clarifai = require('clarifai');
let clarifai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22,
  },
  titleText: {
    fontSize: 50,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'white',
  },
});


export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      uri: '',
      predictions: [],
    };
  }

  async componentDidMount() {
    console.log('inside CDM Lifecycle');
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    clarifai = new Clarifai.App({
      apiKey: 'd33b727722384c04adfa7bdf5589e5cf',
    });
    process.nextTick = setImmediate;
  }

  snap = async () => {
    console.log('inside snap');
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log('photo', photo);
      this.setState({ uri: photo.uri });
      let manipulatedImage = await ImageManipulator.manipulate(
        photo.uri,
        [{ resize: { height: 512, width: 512 } }],
        { base64: true }
      );
      const predictions = await clarifai.models
        .predict(Clarifai.GENERAL_MODEL, manipulatedImage.base64)
        .then(data => data.outputs[0].data.concepts)
        .catch(err => console.log('this is error', err));
      // console.log(predictions.slice(0, 10));
      this.setState({ predictions });
      console.log(this.state);
    }
  };

  render() {
    const { uri } = this.state;
    // console.log('Camera dir',Camera)
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <Text>Home Screen</Text>
            <Button
              title="Go to Predict"
              onPress={() => this.props.navigation.navigate('Prediction')}
            />
            <Button title="Take Photo" onPress={() => this.snap()} />
            <View>
              {/* {uri ? (
                <Image
                  style={{ width: 250, height: 250 }}
                  source={{ uri: this.state.uri }}
                />
              ) : null} */}
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <View style={styles.container}>
                <FlatList
                  data={this.state.predictions.map((prediction, i) => ({
                    key: `${prediction.name} ${prediction.value.toString()}`,
                  }))}
                  renderItem={({ item }) => (
                    <Text style={styles.item}>{item.key}</Text>
                  )}
                />
              </View>

              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {' '}
                  Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

