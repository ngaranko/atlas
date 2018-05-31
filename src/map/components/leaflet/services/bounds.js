export const getBounds = (element) => {
  // if activeElement is a shape
  if (element.getBounds) {
    const elementBounds = element.getBounds();
    if (Object.keys(elementBounds).length) {
      return elementBounds;
    }
  // if activeElement is a point
  } else {
    const latLng = element.getLatLng();
    return [
      [latLng.lat, latLng.lng],
      [latLng.lat, latLng.lng]
    ];
  }
  return [];
};

export const boundsToString = (elementBounds) => (
  elementBounds.toBBoxString ?
    elementBounds.toBBoxString() : elementBounds.toString());
