import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import { Button, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Game from './game';
const game = new Game();
import { updatePermission, updateType, setPredictions } from '../../store';
import { Camera, Permissions, ImageManipulator } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    flexWrap: 'wrap',
    // flexDirection: 'row',
  },
  titleText: {
    fontSize: 50,
  },
  buttonText: {
    fontSize: 30,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    height: '10%',
  },
});

export class Play extends React.Component {
  async componentDidMount() {
    console.log('inside CDM Lifecycle');
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { updateCameraPermission } = this.props;
    updateCameraPermission(status === 'granted');
  }

  checkPhoto = async () => {
    const predictions = await game.predict(await game.snap(this.camera));
    this.props.updatePredictions(predictions);
  };

  render() {
    const {
      hasCameraPermission,
      updateCameraType,
      cameraType,
      predictions,
    } = this.props;
    if (hasCameraPermission === null) {
      return (
        <View>
          {' '}
          <Text>Loading</Text>{' '}
        </View>
      );
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
            type={cameraType}
          >
            {/* <View style={styles.listContainer}> */}
            <FlatList
              data={predictions.map((prediction, i) => ({
                key: `${prediction.name} ${prediction.value.toString()}`,
              }))}
              renderItem={({ item }) => (
                <Text style={styles.item}>{item.key}</Text>
              )}
            />
            {/* </View> */}
            <View style={styles.container}>
              <Button
                icon={<Icon name="arrow-right" size={15} color="white" />}
                title="BUTTON WITH ICON"
              />

              <Button
                icon={<Icon name="arrow-right" size={15} color="white" />}
                iconRight
                title="BUTTON WITH RIGHT ICON"
              />
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => this.checkPhoto()}
              >
                <Text style={styles.buttonText}>Found Item</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  updateCameraType(cameraType === 1 ? 2 : 1);
                }}
              >
                <Text style={styles.buttonText}> Flip </Text>
              </TouchableOpacity> */}
            </View>
          </Camera>
        </View>
      );
    }
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
const mapDispatch = dispatch => ({
  updateCameraPermission(permission) {
    return dispatch(updatePermission(permission));
  },
  updateCameraType(type) {
    return dispatch(updateType(type));
  },
  updatePredictions(predictions) {
    return dispatch(setPredictions(predictions));
  },
});
export default connect(mapState, mapDispatch)(Play);
