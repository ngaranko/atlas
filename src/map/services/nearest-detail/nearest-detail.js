import { getByUrl } from '../../../shared/services/api/api';
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config';
import MAP_CONFIG from '../map-config';

const generateParams = (layer, location, zoom) => ({
  lat: location.latitude,
  lon: location.longitude,
  item: layer.detailItem,
  radius: layer.detailIsShape ? 0 : Math.round(
      (2 ** (MAP_CONFIG.BASE_LAYER_OPTIONS.maxZoom - zoom)) / 2)
});

export const getResult = (results) => {
  const sortedResults = results.sort((a, b) => {
    if (!a.detailIsShape) {
      return -1;
    }
    if (a.detailIsShape) {
      return 1;
    }
    return a.distance - b.distance;
  });

  return sortedResults[0] ? sortedResults[0] : {};
};

const retrieveLayers = (array, layer) => (
  array.map((item) => ({
    ...layer,
    ...item.properties
  })));

export default async function fetchNearestDetail(location, layers, zoom) {
  const results = await layers.map(async (layer) => {
    const params = generateParams(layer, location, zoom);
    const result = await getByUrl(SHARED_CONFIG.API_ROOT + layer.detailUrl, params)
      .then((data) => (retrieveLayers(data.features, layer)));
    return result;
  });
  return Promise.all(results)
  .then((arrays) => arrays
    .reduce((a, b) => ([...a, ...b])));
}
