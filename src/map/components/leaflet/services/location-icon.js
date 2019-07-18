import { Icon } from 'leaflet'

import ICON_CONFIG from './icon-config.constant'

const locationIcon = type =>
  new Icon({
    ...(ICON_CONFIG.LOCATION_MARKER[type]
      ? ICON_CONFIG.LOCATION_MARKER[type]
      : ICON_CONFIG.LOCATION_MARKER.default),
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: 'dp-leaflet-location-icon',
  })

export default locationIcon
