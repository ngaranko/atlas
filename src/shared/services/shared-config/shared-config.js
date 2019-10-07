const baseConfig = {
  RADIUS: 50, // Thumbnail search radius
  THUMBNAIL_WIDTH: 240,
  PANORAMA_THUMBNAIL_URL: 'panorama/thumbnail/',
  AUTH_HEADER_PREFIX: 'Bearer ',
  // Allows sanity checking input of root keys based on white listing
  ROOT_KEYS: ['API_ROOT'],
  CACHE_THRESHOLD: 30, // number of records
}

const SHARED_CONFIG = {
  ...baseConfig,
}

export default SHARED_CONFIG
