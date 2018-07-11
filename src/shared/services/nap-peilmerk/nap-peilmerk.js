import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

export default function fetchByUri(uri) {
  return fetch(uri)
    .then((response) => response.json())
    .then((result) => {
      const geometryCenter = result.geometrie && getCenter(result.geometrie);
      const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null;

      return {
        ...result,
        description: result.omschrijving,
        height: result.hoogte_nap,
        label: result.peilmerkidentificatie,
        location: result.location || wgs84Center,
        wallCoordinates: (result.x_muurvlak !== undefined && result.y_muurvlak !== undefined) ? [
          result.x_muurvlak,
          result.y_muurvlak
        ] : undefined,
        windDirection: result.windrichting,
        year: result.jaar
      };
    });
}
