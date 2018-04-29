import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Game from './game';
import SuccessfulMatch from './successful-match';
import {
  updatePermission,
  updateType,
  setPredictions,
  setTargetItem,
  setLoadStatus,
  setCurrentMatch,
} from '../../store';
import { Camera, Permissions } from 'expo';
import { Footer, Container, Button, FooterTab } from 'native-base';
const game = new Game();

export class Play extends React.Component {
  componentWillMount() {
    StatusBar.setHidden(true);
  }
  async componentDidMount() {
    console.log('inside CDM Lifecycle');
    const {
      updateCameraPermission,
      updateTargetItem,
      updateLoadStatus,
    } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await updateCameraPermission(status === 'granted');
    await updateTargetItem(game.getTargetItem());
    await updateLoadStatus(true);
  }

  checkPhoto = async () => {
    const { updatePredictions, targetItem, updateCurrentMatch } = this.props;
    const predictions = await game.predict(await game.snap(this.camera));
    await updatePredictions(predictions);
    if (predictions.filter(prediction => prediction.name === targetItem).length) {
      updateCurrentMatch(true)
    }
  };

  render() {
    const { hasCameraPermission, cameraType, isLoaded, match } = this.props;
    console.log('camrera', this.camera);
    if (!isLoaded || hasCameraPermission === null) {
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
            <SuccessfulMatch />
          ) : (
            <Container>
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
  game: { isLoaded },
  predictions, targetItem
}) => ({
  hasCameraPermission,
  cameraType,
  predictions,
  isLoaded,
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
  updateLoadStatus(isLoaded) {
    return dispatch(setLoadStatus(isLoaded));
  },
});
export default connect(mapState, mapDispatch)(Play);
