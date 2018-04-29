// ACTION TYPES
const UPDATE_CAMERA_STATUS = 'UPDATE_CAMERA_STATUS';
const SET_TARGET_ITEM = 'SET_TARGET_ITEM';
const UPDATE_SCORE = 'UPDATE_SCORE';
const SET_MATCH = 'SET_MATCH';
const UPDATE_GAME_TIMER = 'UPDATE_GAME_TIMER';
const SET_STOP_INTERVAL = 'SET_STOP_INTERVAL';
// INITIAL STATE
const defaultGameState = {
  isRunning: false,
  score: 0,
  targetItem: {},
  match: false,
  timer: 0,
  stopInterval: null,
};
// ACTION CREATORS
const setStatus = isRunning => ({ type: UPDATE_CAMERA_STATUS, isRunning });
const setItem = item => ({ type: SET_TARGET_ITEM, item });
const setScore = score => ({ type: UPDATE_SCORE, score });
const setMatch = match => ({ type: SET_MATCH, match });
const setTimer = time => ({ type: UPDATE_GAME_TIMER, time });
const setInterval = interval => ({ type: SET_STOP_INTERVAL, interval });
// THUNK CREATORS
export const setTargetItem = item => dispatch => dispatch(setItem(item));
export const updateScore = score => dispatch => dispatch(setScore(score));
export const setLoadStatus = isRunning => dispatch =>
  dispatch(setStatus(isRunning));
export const setCurrentMatch = match => dispatch => dispatch(setMatch(match));
export const setGameTimer = time => dispatch => dispatch(setTimer(time));
export const setStopInterval = interval => dispatch => dispatch(setInterval(interval));
// REDUCER
export default function(state = defaultGameState, action) {
  switch (action.type) {
    case UPDATE_CAMERA_STATUS:
      return { ...state, isRunning: action.isRunning };
    case SET_TARGET_ITEM:
      return { ...state, targetItem: action.item };
    case UPDATE_SCORE:
      return { ...state, score: action.score + state.score };
    case SET_MATCH:
      return { ...state, match: action.match };
    case UPDATE_GAME_TIMER:
      return { ...state, timer: action.time };
    case SET_STOP_INTERVAL:
      return { ...state, stopInterval: action.interval };
    default:
      return state;
  }
}
