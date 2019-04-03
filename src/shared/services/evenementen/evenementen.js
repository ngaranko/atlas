import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

import { getByUrl } from '../api/api';
import { ymdToDate, dateToString } from '../date-formatter/date-formatter';

export const formatEvenementResult = (result) => {
  const geometryCenter = getCenter(result.wkb_geometry);
  const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null;

  return {
    ...result,
    startdatum: result.startdatum ? dateToString(ymdToDate(result.startdatum)) : '',
    einddatum: result.einddatum ? dateToString(ymdToDate(result.einddatum)) : '',
    label: result.titel,
    location: wgs84Center,
    geometrie: result.wkb_geometry
  };
};

export default function fetchByUri(uri) {
  return getByUrl(uri)
    .then((result) => formatEvenementResult(result));
}
