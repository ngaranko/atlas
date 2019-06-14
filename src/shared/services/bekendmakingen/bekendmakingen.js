import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

import { getByUrl } from '../api/api';
import { dateToString } from '../date-formatter/date-formatter';


export default function fetchByUri(uri) {
  return getByUrl(uri)
    .then((result) => {
      const geometryCenter = result.wkb_geometry && getCenter(result.wkb_geometry);
      const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null;

      return {
        geometrie: result.wkb_geometry,
        label: result._display,
        categorie: result.categorie,
        onderwerp: result.onderwerp,
        beschrijving: result.beschrijving,
        date: result.datum ? dateToString(new Date(result.datum)) : '',
        location: wgs84Center,
        url: result.url
      };
    });
}
