// ACTION TYPES
const CAMERA_PERMISSION_GRANTED = 'CAMERA_PERMISSION_GRANTED';
// INITIAL STATE
const defaultPermission = null;
// ACTION CREATORS
const init = permission => ({ type: CAMERA_PERMISSION_GRANTED, permission });
// THUNK CREATORS
export const updatePermission = permission => dispatch => dispatch(init(permission));
// REDUCER
export default function(state = defaultPermission, action) {
  switch (action.type) {
    case CAMERA_PERMISSION_GRANTED:
      return true;
    default:
      return state;
  }
}
