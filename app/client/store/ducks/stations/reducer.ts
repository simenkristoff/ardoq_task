import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';

import { reformatStations, updateStatuses } from './helpers';
import { StationState, StationActionTypes, Station } from './types';

// The initial state.
export const initialState: StationState = {
  data: {},
  loading: false,
  error: null,
};

/**
 * Reducer actions for Stations.
 * @param {StationState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const stationReducer = (
  state: StationState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): StationState => {
  switch (action.type) {
    case StationActionTypes.FETCH.START: {
      return { ...state, loading: true, error: null };
    }
    case StationActionTypes.FETCH.SUCCESS: {
      return { ...state, data: reformatStations(action.payload as Station[]), loading: false };
    }
    case StationActionTypes.FETCH.ERROR: {
      return { ...state, error: action.payload, loading: false };
    }
    case StationActionTypes.UPDATE_STATUSES: {
      return { ...state, data: updateStatuses(state.data, action.payload) };
    }
    default:
      return state;
  }
};
