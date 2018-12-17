import { TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.nontiledlayer';

class NonTiledLayer extends TileLayer {
  createLeafletElement(props) {
    const { url, ...params } = props;
    return L.nonTiledLayer.wms(url, this.getOptions(params));
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.url !== fromProps.url) {
      // eslint-disable-next-line no-underscore-dangle
      this.leafletElement._wmsUrl = toProps.url;
      this.leafletElement.wmsParams.layers = toProps.layers;
    }

    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
  }
}

export default NonTiledLayer;
