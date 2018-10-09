// inspired from https://github.com/ebrelsford/Leaflet.loading
// and https://github.com/tumerorkun/react-leaflet-zoom-indicator
import L from 'leaflet';
import { MapControl } from 'react-leaflet';
import './MapBusyIndicator.scss';

export const DATA_LOADING_EVENT = 'dataloading';
export const DATA_LOADED_EVENT = 'dataloaded';

export default class MapBusyIndicator extends MapControl {

  constructor(props, context) {
    super(props);
    this.map = context.map;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading) {
      if (nextProps.loading) {
        this.map.fire(DATA_LOADING_EVENT);
      } else {
        this.map.fire(DATA_LOADED_EVENT);
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  createLeafletElement(props) { // eslint-disable-line class-methods-use-this
    const MapBusyIndicatorControl = this.createMapBusyIndicatorControl();
    return new MapBusyIndicatorControl(props);
  }

  createMapBusyIndicatorControl() { // eslint-disable-line class-methods-use-this
    const controlExtension = this.createMapContolExtension();
    return L.Control.extend(controlExtension);
  }

  createMapContolExtension() { // eslint-disable-line class-methods-use-this
    return {
      options: {
        position: 'topleft'
      },

      initialize(options) {
        L.setOptions(this, options);
        this.dataLoaders = {};
      },

      createContainer() {
        //  create a container for the indicator
        const container = L.DomUtil.create('div', 'leaflet-control-layer-container leaflet-bar');
        this.indicatorContainer = container;

        // Create the loading indicator
        this.indicator = L.DomUtil.create('a', 'leaflet-control-loading', container);

        return container;
      },

      onAdd(map) {
        this.addMapListeners(map);
        const container = this.createContainer();
        return container;
      },

      onRemove(map) {
        this.removeMapListeners(map);
      },

      updateIndicator(isLoading) {
        if (isLoading) {
          L.DomUtil.addClass(this.indicator, 'is-loading');
        } else {
          L.DomUtil.removeClass(this.indicator, 'is-loading');
        }
      },

      handleLoading() {
        this.updateIndicator(true);
      },

      handleLoaded() {
        this.updateIndicator(false);
      },

      addMapListeners(map) {
        // Add listeners to the map for (custom) dataloading and dataload
        // events, for AJAX calls that affect the map but will not be
        // reflected in the layer events.
        map.on({
          [DATA_LOADING_EVENT]: this.handleLoading,
          [DATA_LOADED_EVENT]: this.handleLoaded
        }, this);
      },

      removeMapListeners(map) {
        map.off({
          [DATA_LOADING_EVENT]: this.handleLoading,
          [DATA_LOADED_EVENT]: this.handleLoaded
        }, this);
      }
    };
  }
}
