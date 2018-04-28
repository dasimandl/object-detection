// import React from 'react';
import { Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { updatePermission, updateType, setPredictions } from '../../store';

import React, { Component } from 'react';

export class FlipCamera extends Component {
  render() {
    const { cameraType, updateCameraType } = this.props;
    return (
      <Button
        transparent
        onPress={() => updateCameraType(cameraType === 1 ? 2 : 1)}
      >
        <Icon name="ios-reverse-camera" />
      </Button>
    );
  }
}

// export const FlipCamera = props => {
//   const { cameraType, updateCameraType } = props;
//   console.log('header props', props);
//   return (
//     <Button
//       transparent
//       onPress={() => updateCameraType(cameraType === 1 ? 2 : 1)}
//     >
//       <Icon name="ios-reverse-camera" />
//     </Button>
//   );
// };

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
export default connect(mapState, mapDispatch)(FlipCamera);
