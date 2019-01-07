import { normalizeCoordinate } from '../../shared/services/coordinate-reference-system';

export const getCurrentLocation = (leafletMap) => {
  const center = leafletMap.getCenter();

  return [
    normalizeCoordinate(center.lat, 7),
    normalizeCoordinate(center.lng, 7)
  ];
};

export const panTo = (leafletMap, location) => {
  // Prevent infinite loop; the 'moveend' event triggers panTo,
  // and panning always triggers a 'moveend' event.

  const currentLocation = getCurrentLocation(leafletMap);
  if (
    !currentLocation ||
    location[0] !== currentLocation[0] ||
    location[1] !== currentLocation[1]
  ) {
    // location != currentLocation
    leafletMap.panTo(location, { animate: false });
  }
};
