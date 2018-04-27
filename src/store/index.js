import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import cameraData from './camera-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const reducers = combineReducers({ cameraData });

const store = createStore(reducers, middleware);

export function configureStore() {
  return { store };
}
export default store;
export * from './camera-reducer';
