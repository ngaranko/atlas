import { Icon } from 'leaflet';

import ICON_CONFIG from './icon-config.constant';

export const straatbeeldPersonIcon = () => new Icon({
  ...ICON_CONFIG.STRAATBEELD_PERSON,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  className: 'straatbeeld_person'
});

export const straatbeeldOrientationIcon = () => new Icon({
  ...ICON_CONFIG.STRAATBEELD_ORIENTATION,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  className: 'straatbeeld_orientation'
});
