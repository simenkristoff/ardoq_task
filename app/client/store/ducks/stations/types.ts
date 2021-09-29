/* eslint-disable camelcase */
import { BaseState } from '@/types';
import { generateAsyncAction } from '@/utils';

/**
 * Collection of Stations where 'station_id' is used as key.
 */
export type StationCollection = { [key: string]: StationEntity };

/**
 * Describes the state of station data stored in redux.
 */
export interface StationState extends Omit<BaseState<StationEntity>, 'data'> {
  data: StationCollection;
}

/**
 * Sanitized station entity where 'station_id' is omitted.
 * @see {@link Station}
 */
export interface StationEntity extends Station {
  status: Omit<StationStatus, 'station_id'>;
}

/**
 * Raw station entity returned from api-requests.
 */
export interface Station {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
}

/**
 * Raw station status returned from api.
 */
export interface StationStatus {
  is_installed: number;
  is_renting: number;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: number;
  is_returning: number;
  station_id: string;
}

export const StationActionTypes = {
  FETCH: generateAsyncAction('@@station.FETCH'),
  UPDATE_STATUSES: '@@station.UPDATE_STATUSES',
};
