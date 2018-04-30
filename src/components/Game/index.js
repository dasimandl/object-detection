import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Game from './game';
import SuccessfulMatch from './successful-match';
import CurrentTarget from './current-target';
import {
  updatePermission,
  updateType,
  setPredictions,
  setTargetItem,
  setLoadStatus,
  setCurrentMatch,
  setStopInterval,
  updateUri,
} from '../../store';
import { Camera, Permissions } from 'expo';
import { Footer, Container, Button, FooterTab } from 'native-base';
const game = new Game();

export class Play extends React.Component {
  constructor(props) {
    super(props);
    if (this.camera) {
      this.camera = this.camera.bind(this);
      this.start = this.start.bind(this);
    }
  }
  componentWillMount() {
    StatusBar.setHidden(true);
  }
  async componentDidMount() {
    const { updateCameraPermission, updateTargetItem } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await updateCameraPermission(status === 'granted');
    await updateTargetItem(game.getTargetItem());
  }

  start = () => {
    const {
      updateCurrentMatch,
      targetItem,
      updatePredictions,
      updateCurrentUri,
    } = this.props;
    const intervalId = setInterval(async () => {
      const photo = await game.snap(this.camera);
      const resizedImage = await game.resize(photo);
      const predictions = await game.predict(resizedImage);
      if (
        predictions &&
        predictions.some(
          prediction => prediction.name === targetItem && prediction.value > 0.8
        )
      ) {
        await updateCurrentUri(photo);
        // console.log('MATCHED', predictions, targetItem);
        await updatePredictions(predictions);
        await updateCurrentMatch(true);
      }
    }, 2500);
    return intervalId;
  };

  render() {
    const {
      hasCameraPermission,
      cameraType,
      match,
      targetItem,
      updateStopInterval,
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
        <Container>
          {match ? (
            <SuccessfulMatch
              camera={this.camera}
              game={game}
              start={this.start}
            />
          ) : (
            <Container>
              {targetItem ? <CurrentTarget /> : null}
              <Camera
                ref={ref => {
                  this.camera = ref;
                }}
                style={{ flex: 1 }}
                type={cameraType}
                onCameraReady={async () =>
                  updateStopInterval(await this.start(this.camera))
                }
              />
            </Container>
          )}
        </Container>
      );
    }
  }
}

const mapState = ({
  cameraData: { hasCameraPermission, cameraType },
  game: { isRunning, targetItem, match },
}) => ({
  hasCameraPermission,
  cameraType,
  isRunning,
  targetItem,
  match,
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
  updateTargetItem(item) {
    return dispatch(setTargetItem(item));
  },
  updateCurrentMatch(item) {
    return dispatch(setCurrentMatch(item));
  },
  updateLoadStatus(isRunning) {
    return dispatch(setLoadStatus(isRunning));
  },
  updateStopInterval(interval) {
    return dispatch(setStopInterval(interval));
  },
  updateCurrentUri(photo) {
    return dispatch(updateUri(photo));
  },
});
export default connect(mapState, mapDispatch)(Play);
