import config from './crs-config';
import proj4 from 'proj4';

/**
 * Converts the given WGS84 coordinates (lat, lon) to RD coordinates.
 *
 * Please mind: x is lon (4.xxx) and y is lat (52.xxx).
 *
 * @params {Array} wgs84Coordinates of the form [lat, lon]
 *
 * @returns {Array} RD coordinates of the form [x, y]
 */
export function wgs84ToRd (wgs84Coordinates) {
    return proj4(config.rd.projection, angular.copy(wgs84Coordinates).reverse());
}

/**
 * Converts the given RD coordinates to WGS84 coordinates (lat, lon).
 *
 * Please mind: x is lon (4.xxx) and y is lat (52.xxx).
 *
 * @params {Array} rdCoordinates of the form [x, y]
 *
 * @returns {Array} WGS84 coordinates of the form [lat, lon]
 */
export function rdToWgs84 (rdCoordinates) {
    return proj4(config.rd.projection, config.wgs84.projection, rdCoordinates).reverse();
}
