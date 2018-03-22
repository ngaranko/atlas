import BOUNDING_BOX from './bounding-box.constant';
import { getEnvironment } from '../../shared/environment';
import getCrs from './crs-service';

const BOUNDS = [
  BOUNDING_BOX.COORDINATES.southWest,
  BOUNDING_BOX.COORDINATES.northEast
];

const defaultConfig = {
  BASE_LAYER_OPTIONS: {
    tms: true,
    minZoom: 8,
    maxZoom: 16,
    bounds: BOUNDS
  },
  MAP_OPTIONS: {
    crs: getCrs(),
    maxBounds: BOUNDS,
    // 1.0 makes the bounds fully solid, preventing the user from dragging outside the bounds
    maxBoundsViscosity: 1.0,
    bounceAtZoomLimits: false,
    attributionControl: false,
    zoomControl: false
  },
  OVERLAY_OPTIONS: {
    identify: false,
    format: 'image/png',
    transparent: true
  },
  SCALE_OPTIONS: {
    position: 'bottomright',
    metric: true,
    imperial: false
  },
  ZOOM_OPTIONS: {
    position: 'bottomright',
    zoomInTitle: 'Inzoomen',
    zoomOutTitle: 'Uitzoomen'
  },
  DEFAULT_ZOOM_HIGHLIGHT: 14
};


const environmentConfig = {
  PRODUCTION: {
    BASE_LAYER_OPTIONS: {
      subdomains: ['t1', 't2', 't3', 't4']
    },
    OVERLAY_ROOT: 'https://map.data.amsterdam.nl/'
  },
  PRE_PRODUCTION: {
    BASE_LAYER_OPTIONS: {
      subdomains: ['t1', 't2', 't3', 't4']
    },
    OVERLAY_ROOT: 'https://map.data.amsterdam.nl/'
  },
  ACCEPTATION: {
    BASE_LAYER_OPTIONS: {
      subdomains: ['acc.t1', 'acc.t2', 'acc.t3', 'acc.t4']
    },
    OVERLAY_ROOT: 'https://acc.map.data.amsterdam.nl/'
  },
  DEVELOPMENT: {
    BASE_LAYER_OPTIONS: {
      subdomains: ['acc.t1', 'acc.t2', 'acc.t3', 'acc.t4']
    },
    OVERLAY_ROOT: 'https://acc.map.data.amsterdam.nl/'
  }
};

const env = getEnvironment(window.location.host);

const getMapConfig = () => ({
  ...defaultConfig,
  BASE_LAYER_OPTIONS: {
    ...defaultConfig.BASE_LAYER_OPTIONS,
    ...environmentConfig[env].BASE_LAYER_OPTIONS
  },
  OVERLAY_ROOT: environmentConfig[env].OVERLAY_ROOT
});

export default getMapConfig;
