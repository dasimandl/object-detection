import React from 'react';
import { Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { updatePermission, updateType, setPredictions } from '../../store';

export const FlipCamera = props => {
  const { cameraType, updateCameraType } = props;
  return (
    <Button
      transparent
      onPress={() => updateCameraType(cameraType === 1 ? 2 : 1)}
    >
      <Icon style={{color: '#fff'}} name="ios-reverse-camera" />
    </Button>
  );
};

const mapState = ({
  cameraData: { hasCameraPermission, cameraType },
  predictions,
}) => ({
  hasCameraPermission,
  cameraType,
  predictions,
});
const mapDispatch = dispatch => ({
  updateCameraType(type) {
    return dispatch(updateType(type));
  },
});
export default connect(mapState, mapDispatch)(FlipCamera);
