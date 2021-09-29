import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { StationActionTypes } from './types';
import { ApiMetaAction } from '@/types';
import { apiCaller } from '@/utils';

/**
 * Handle async GET request to API for fetching Stations.
 * @param {ApiMetaAction} params action with meta data.
 */
function* handleFetch(params: ApiMetaAction): Generator {
  try {
    const res: any = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: StationActionTypes.FETCH.SUCCESS, payload: res.stations });
  } catch (err) {
    if (err instanceof Error) {
      yield put({
        type: StationActionTypes.FETCH.ERROR,
        payload: err.message,
      });
    } else {
      yield put({
        type: StationActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(StationActionTypes.FETCH.START, handleFetch);
}

/**
 * saga init, forks in effects.
 */
export default function* stationSaga(): Generator {
  yield all([fork(watchFetchRequest)]);
}
