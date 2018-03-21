import proj4 from 'proj4'; //eslint-disable-line 
import proj4leaflet from 'proj4leaflet'; //eslint-disable-line

import CRS_CONFIG from './crs-config.constant';

function getCrs() {
  const rdSettings = CRS_CONFIG.RD;

  rdSettings.transformation.bounds =
    window.L.bounds.apply(null, CRS_CONFIG.RD.transformation.bounds);
  const test = new window.L.Proj.CRS(
          rdSettings.code,
          rdSettings.projection,
          rdSettings.transformation
      );

  test.distance = window.L.CRS.Earth.distance;
  test.R = CRS_CONFIG.EARTH_RADIUS;

  return test;
}

export default getCrs;
