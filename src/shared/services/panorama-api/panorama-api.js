import sharedConfig from '../shared-config/shared-config';
import { getByUrl } from '../api/api';
import getCenter from '../geo-json/geo-json';

const MAX_RADIUS_KM = 100; // The maximum search radius panorama in KM

export const PANORAMA_CONFIG = {
  PANORAMA_ENDPOINT_ALL: 'panorama/recente_opnames/alle/',
  PANORAMA_ENDPOINT_YEAR: 'panorama/recente_opnames/',
  DEFAULT_FOV: 80,
  MAX_FOV: 90,
  MAX_RESOLUTION: 12 * 1024,
  CAMERA_HEIGHT: 1.8,
  LEVEL_PROPERTIES_LIST: [
    {
      tileSize: 256,
      size: 256,
      fallbackOnly: true
    },
    {
      tileSize: 512,
      size: 512
    },
    {
      tileSize: 512,
      size: 1024
    },
    {
      tileSize: 512,
      size: 2048
    }
  ]
};

function imageData(response) {
  if (response.geometrie !== null && typeof response.geometrie === 'object') {
    const formattedGeometrie = {
      coordinates: [
        response.geometrie.coordinates[1],
        response.geometrie.coordinates[0]
      ],
      type: response.geometrie.type
    };

    const center = getCenter(formattedGeometrie);

    return {
      date: new Date(response.timestamp),
      id: response.pano_id,
      hotspots: response.adjacent.map((item) => ({
        id: item.pano_id,
        heading: item.heading,
        distance: item.distance,
        year: item.year
      })),
      location: [center.x, center.y],
      image: response.image_sets.cubic
    };
  }

  return null;
}

function fetchPanorama(url) {
  const promise = new Promise((resolve, reject) => {
    getByUrl(url)
      .then((data) => {
        resolve(imageData(data));
      })
      .catch((error) => reject(error));
  });

  return promise;
}

/**
 * Search for a straatbeeld.
 *
 * @param {Number[]} location The center location.
 * @param {Number} radius The distance from the location within to
 *   search for a straatbeeld.
 * @param {Number} year The year to featch hotspots for, queries all
 *   years when falsy.
 *
 * @returns {Promise.imageData} The fetched straatbeeld, or null on failure.
 */
function searchWithinRadius(location, radius, year) {
  const endpoint = year
    ? `${PANORAMA_CONFIG.PANORAMA_ENDPOINT_YEAR}${year}/`
    : PANORAMA_CONFIG.PANORAMA_ENDPOINT_ALL;

  return fetchPanorama(`${sharedConfig.API_ROOT}${endpoint}?lat=${location[0]}&lon=${location[1]}&radius=${radius}`)
    .then((data) => {
      if (data) {
        return data;
      }
      return null;
    });
}

/**
 * @param {Number[]} location The center location.
 * @param {Number} year The year to featch hotspots for, queries all
 *   years when falsy.
 * @returns {Promise.imageData} The fetched straatbeeld, or null on failure.
 */
export function getImageDataByLocation(location, year) {
  return searchWithinRadius(location, MAX_RADIUS_KM * 1000, year);
}

export function getImageDataById(id, year) {
  const endpoint = year
    ? `${PANORAMA_CONFIG.PANORAMA_ENDPOINT_YEAR}${year}/`
    : PANORAMA_CONFIG.PANORAMA_ENDPOINT_ALL;

  return fetchPanorama(`${sharedConfig.API_ROOT}${endpoint}${id}/`);
}
