import { Icon } from 'leaflet';

import ICON_CONFIG from './icon-config.constant';

const locationIcon = (icon = 'default') => new Icon({
  ...ICON_CONFIG.LOCATION_MARKER[icon],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  className: 'dp-leaflet-location-icon'
});

export default locationIcon;
