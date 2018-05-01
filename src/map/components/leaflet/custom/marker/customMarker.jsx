import { Marker } from 'react-leaflet';

class CustomMarker extends Marker {
  updateLeafletElement(fromProps, toProps) {
    Marker.prototype.updateLeafletElement.call(this, toProps, fromProps);
    if (toProps.rotationAngle !== fromProps.rotationAngle) {
      this.leafletElement.setRotationAngle(toProps.rotationAngle);
    }
  }
}

export default CustomMarker;
