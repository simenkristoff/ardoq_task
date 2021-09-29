import _ from 'lodash';

import { toRadians } from './toRadians';
import { StationCollection } from '@/store/ducks/stations/types';

type NearestStation = { station_id: string; distance: number };

/**
 * Finds the closest station given a reference geolocation, radius and collection of stations.
 * @param {number} lat reference latitude
 * @param {number} lng reference longitude
 * @param {number} radius search radius
 * @param {StationCollection} data collection of stations to lookup
 * @returns {NearestStation | null} the station closest to reference point, or null if none were found.
 */
export const findNearest = (
  lat: number,
  lng: number,
  radius: number,
  data: StationCollection,
): NearestStation | null => {
  const { acos, cos, sin } = Math;
  const results: NearestStation[] = [];
  Object.entries(data).forEach(([key, value]) => {
    let distance =
      6371 *
      acos(
        cos(toRadians(lat)) *
          cos(toRadians(value.lat)) *
          cos(toRadians(value.lon) - toRadians(lng)) +
          sin(toRadians(lat)) * sin(toRadians(value.lat)),
      );
    distance = Math.round((distance + Number.EPSILON) * 100) / 100;
    if (distance <= radius && value.status.num_bikes_available > 0) {
      results.push({ station_id: key, distance });
    }
  });
  if (results.length <= 0) {
    throw new Error('Failed to find closest station');
  }
  return _.orderBy(results, 'distance', 'asc')[0];
};
