// ACTION TYPES
const START_GAME = 'START_GAME';
const UPDATE_SCORE = 'UPDATE_SCORE';
// INITIAL STATE
const defaultGameState = {
  isLoaded: false,
  score: 0,
}
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
