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
    console.log('inside CDM Lifecycle');
    const {
      updateCameraPermission,
      updateTargetItem,
      updateLoadStatus,
      updateStopInterval,
    } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await updateCameraPermission(status === 'granted');
    await updateTargetItem(game.getTargetItem());
    await updateLoadStatus(true);
    await updateStopInterval(await this.start(this.camera));
  }

  start = async camera => {
    console.log('inside start', camera);
    const { updatePredictions, updateCurrentMatch, targetItem } = this.props;
    const interval = setInterval(async () => {
      const photo = await game.snap(camera);
      const predictions = await game.predict(photo);
      // await updatePredictions(predictions);
      console.log('new predictions', predictions, 'target', targetItem);
      if (
        predictions.filter(prediction => prediction.name === targetItem).length
      ) {
        updateCurrentMatch(true);
      }
    }, 3000);
    return interval;
  };
  checkPhoto = async () => {
    const { updatePredictions, targetItem, updateCurrentMatch } = this.props;
    const predictions = await game.predict(await game.snap(this.camera));
    await updatePredictions(predictions);
    console.log('new predictions', predictions, 'target', targetItem);
    if (
      predictions.filter(prediction => prediction.name === targetItem).length
    ) {
      updateCurrentMatch(true);
    }
  };

  render() {
    const {
      hasCameraPermission,
      cameraType,
      isRunning,
      match,
      targetItem,
    } = this.props;
    console.log('Play Camera', this.camera);
    if (!isRunning || hasCameraPermission === null) {
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
              />
              <Footer>
                <FooterTab>
                  <Button full onPress={() => this.checkPhoto()}>
                    <Text>Found Item</Text>
                  </Button>
                </FooterTab>
              </Footer>
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
});
export default connect(mapState, mapDispatch)(Play);
