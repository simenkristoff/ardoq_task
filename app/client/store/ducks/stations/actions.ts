import { action } from 'typesafe-actions';

import { StationActionTypes, StationStatus } from './types';
import { ApiMetaAction, ApiPayloadAction } from '@/types';

/**
 * Fetch all stations
 * @returns meta action
 */
export const fetchStations = (): ApiMetaAction =>
  action(StationActionTypes.FETCH.START, [], {
    method: 'get',
    route: '/stations',
  });

/**
 * Update statuses of all stations stored in redux state.
 * @param {StationStatus[]} data array containing status-data for each station
 * @returns payload action
 */
export const updateStationStatuses = (data: StationStatus[]): ApiPayloadAction<StationStatus[]> =>
  action(StationActionTypes.UPDATE_STATUSES, data);
