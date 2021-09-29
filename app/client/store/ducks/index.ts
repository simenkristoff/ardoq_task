import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all, fork } from 'redux-saga/effects';

import { ApplicationState } from '../../types';
// Import all reducers and sagas from ducks.
import { station, stationSaga } from './stations';

/**
 * Merge all reducers into one.
 */
const reducers = {
  station,
};

/**
 * Type of all reducers combined.
 */
export type Reducers = typeof reducers;

export const rootReducer = combineReducers<ApplicationState>({
  ...reducers,
});

/**
 * Configure the state storage.
 * States added to the whitelist-array will be persistent,
 * and will not be lost when refreshing the page.
 */
export const configStorage = {
  key: 'root',
  storage,
  whitelist: [],
};

export const persistentReducer = persistReducer(configStorage, rootReducer);

/**
 * Merge all sagas into one
 */
export function* rootSaga() {
  yield all([fork(stationSaga)]);
}
