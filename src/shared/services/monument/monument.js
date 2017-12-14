import { getAuthHeaders } from '../auth/auth';
import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

export default function fetchByUri(uri) {
  return fetch(uri, { headers: getAuthHeaders() })
    .then((response) => response.json())
    .then((result) => {
      const geometryCenter =
        (result.geometrie && getCenter(result.geometrie)) ||
        (result.monumentcoordinaten && getCenter(result.monumentcoordinaten));
      const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null;

      return {
        ...result,
        location: result.location || wgs84Center
      };
    });
}
