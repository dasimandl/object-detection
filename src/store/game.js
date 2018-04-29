// ACTION TYPES
const LOAD_STATUS_UPDATE = 'LOAD_STATUS_UPDATE';
const SET_TARGET_ITEM = 'SET_TARGET_ITEM';
const UPDATE_SCORE = 'UPDATE_SCORE';
const SET_MATCH = 'SET_MATCH';
// INITIAL STATE
const defaultGameState = {
  isLoaded: false,
  score: 0,
  targetItem: {},
  match: false,
};
// ACTION CREATORS
const setStatus = isLoaded => ({ type: LOAD_STATUS_UPDATE, isLoaded });
const setItem = item => ({ type: SET_TARGET_ITEM, item });
const setScore = score => ({ type: SET_TARGET_ITEM, score });
const setMatch = match => ({ type: SET_TARGET_ITEM, match });
// THUNK CREATORS
export const setTargetItem = item => dispatch => dispatch(setItem(item));
export const updateScore = score => dispatch => dispatch(setScore(score));
export const setLoadStatus = isLoaded => dispatch => dispatch(setStatus(isLoaded));
export const setCurrentMatch = match => dispatch => dispatch(setMatch(match));
// REDUCER
export default function(state = defaultGameState, action) {
  switch (action.type) {
    case LOAD_STATUS_UPDATE:
      return { ...state, isLoaded: action.isLoaded };
    case SET_TARGET_ITEM:
      return { ...state, targetItem: action.item };
    case UPDATE_SCORE:
      return { ...state, score: action.score + state.score };
    case SET_MATCH:
      return { ...state, match: action.match };
    default:
      return state;
  }
}
