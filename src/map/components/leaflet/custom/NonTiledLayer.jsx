import { TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.nontiledlayer';

class NonTiledLayer extends TileLayer {
  createLeafletElement(props) {
    const { url, ...params } = props;
    return L.nonTiledLayer.wms(url, this.getOptions(params));
  }
}

export default NonTiledLayer;
