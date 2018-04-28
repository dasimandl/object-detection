import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import cameraData from './camera-reducer';
import predictions from './predictions';

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const reducers = combineReducers({ cameraData, predictions });

const store = createStore(reducers, middleware);

export function configureStore() {
  return { store };
}
export default store;
export * from './camera-reducer';
export * from './predictions';
