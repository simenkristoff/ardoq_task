import { Station, StationCollection, StationStatus } from './types';

/**
 * Reformats an array of stations to a collection of stations where their id
 * is used as key for faster lookup, O(n).
 * @param {Station[]} data array of stations
 * @returns collection of stations
 */
export const reformatStations = (data: Station[]): StationCollection => {
  const result: StationCollection = {};
  const status: Omit<StationStatus, 'station_id'> = {
    is_installed: 0,
    is_renting: 0,
    num_bikes_available: 0,
    num_docks_available: 0,
    last_reported: 0,
    is_returning: 0,
  };
  data.forEach((station) => {
    const { station_id } = station;
    result[station_id as string] = { ...station, status };
  });
  return result;
};

/**
 * Links and updates each station in a collection of stations
 * with statuses from an array of station statuses.
 * @param {StationCollection} currState the current collection of stations
 * @param {StationCollection} statuses the array of statues
 * @returns collection of stations with updated statuses
 */
export const updateStatuses = (
  currState: StationCollection,
  statuses: StationStatus[],
): StationCollection => {
  statuses.forEach((status) => {
    const { station_id, ...value } = status;
    currState[station_id].status = value;
  });
  return currState;
};
