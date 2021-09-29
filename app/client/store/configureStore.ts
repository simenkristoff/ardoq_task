import { applyMiddleware, createStore, compose, Store } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { ApplicationState } from '../types';
import { rootSaga, persistentReducer } from './ducks';
import sagaMiddleware from './middlewares/sagas';

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore(initialState: ApplicationState): Store<ApplicationState> {
  const middlewares = [thunk, sagaMiddleware, logger];

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(persistentReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}
