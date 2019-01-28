import { Marker } from 'react-leaflet';

class CustomMarker extends Marker {
  updateLeafletElement(fromProps, toProps) {
    super.updateLeafletElement(fromProps, toProps);
    if (toProps.rotationAngle !== fromProps.rotationAngle) {
      this.leafletElement.setRotationAngle(toProps.rotationAngle);
    }
  }
}

export default CustomMarker;
