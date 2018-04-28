// ACTION TYPES
const CAMERA_PERMISSION_GRANTED = 'CAMERA_PERMISSION_GRANTED';
const SET_CAMERA_TYPE = 'SET_CAMERA_TYPE';
// INITIAL STATE
const defaultCameraData = {
  hasCameraPermission: null,
  cameraType: 1,
  camera: null,
};
// ACTION CREATORS
const init = permission => ({ type: CAMERA_PERMISSION_GRANTED, permission });
const setCameraType = cameraType => ({ type: SET_CAMERA_TYPE, cameraType });
// THUNK CREATORS
export const updatePermission = permission => dispatch =>
  dispatch(init(permission));
export const updateType = cameraType => dispatch =>
  dispatch(setCameraType(cameraType));

// REDUCER
export default function(state = defaultCameraData, action) {
  switch (action.type) {
    case CAMERA_PERMISSION_GRANTED:
      return { ...state, hasCameraPermission: action.permission };
    case SET_CAMERA_TYPE:
      return { ...state, cameraType: action.cameraType };
    default:
      return state;
  }
}
