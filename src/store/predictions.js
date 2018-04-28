// ACTION TYPES
const UPDATE_PREDICTIONS = 'UPDATE_PREDICTIONS';
// INITIAL STATE
const defaultPredictionData = []
// ACTION CREATORS
const update = predictions => ({ type: UPDATE_PREDICTIONS, predictions });
// THUNK CREATORS
export const setPredictions = predictions => dispatch =>
  dispatch(update(predictions));
// REDUCER
export default function(state = defaultPredictionData, action) {
  switch (action.type) {
    case UPDATE_PREDICTIONS:
      return action.predictions;
    default:
      return state;
  }
}
