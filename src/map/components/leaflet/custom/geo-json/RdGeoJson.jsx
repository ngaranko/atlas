import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import proj4 from 'proj4'; //eslint-disable-line
import proj4leaflet from 'proj4leaflet'; //eslint-disable-line

import { getRdObject } from '../../../../services/crs-service';
import ICON_CONFIG from '../../services/icon-config.constant';

class RdGeoJson extends GeoJSON {
  createLeafletElement() {
    const { data, style } = this.props;
    const geometry = {
      ...data.geometry,
      crs: getRdObject()
    };
    const customStyle = {
      color: 'red',
      fillColor: 'red',
      weight: 2,
      opacity: 1.6,
      fillOpacity: 0.2,
      ...style
    };
    return L.Proj.geoJson(geometry, {
      style: /* istanbul ignore next */ () => customStyle,
      pointToLayer: /* istanbul ignore next */ (feature, latLng) => {
        const icon = L.icon(ICON_CONFIG.DETAIL);
        const rotationAngle = data.orientation || 0;

        return L.marker(latLng, {
          icon,
          rotationAngle,
          alt: 'Marker op de kaart'
        });
      }
    });
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.layerContainer.removeLayer(this.leafletElement);
  }
}

export default RdGeoJson;
