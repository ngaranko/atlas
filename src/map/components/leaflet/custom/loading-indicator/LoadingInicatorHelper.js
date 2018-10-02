/* eslint-disable */
import L from 'leaflet';

const createLoadingIndicatorControl = () => {
  return L.Control.extend({
    options: {
      position: 'topleft',
      spin: {
        lines: 7,
        length: 3,
        width: 3,
        radius: 5,
        rotate: 13,
        top: '83%'
      }
    },

    initialize(options) {
      L.setOptions(this, options);
      this._dataLoaders = {};
    },

    onAdd(map) {
      this._addLayerListeners(map);
      this._addMapListeners(map);

      // Create the loading indicator
      const classes = 'leaflet-control-loading';

      //  create a container for the indicator
      const container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-control-layer-container leaflet-bar');
      this._indicatorContainer = container;
      this._indicator = L.DomUtil.create('a', classes, container);
      return container;
    },

    onRemove(map) {
      this._removeLayerListeners(map);
      this._removeMapListeners(map);
    },

    removeFrom(map) {
      // call the parent method so we don't leave behind an empty container
      return L.Control.prototype.removeFrom.call(this, map);
    },

    addLoader(id) {
      this._dataLoaders[id] = true;
      this.updateIndicator();
    },

    removeLoader(id) {
      delete this._dataLoaders[id];
      this.updateIndicator();
    },

    updateIndicator() {
      if (this.isLoading()) {
        this._showIndicator();
      } else {
        this._hideIndicator();
      }
    },

    isLoading() {
      return this._countLoaders() > 0;
    },

    _countLoaders() {
      let size = 0,
        key;
      for (key in this._dataLoaders) {
        if (this._dataLoaders.hasOwnProperty(key)) size++;
      }
      return size;
    },

    _showIndicator() {
      // Show loading indicator
      L.DomUtil.addClass(this._indicator, 'is-loading');
      L.DomUtil.addClass(this._indicatorContainer, 'is-loading');
    },

    _hideIndicator() {
      // Hide loading indicator
      L.DomUtil.removeClass(this._indicator, 'is-loading');
      L.DomUtil.removeClass(this._indicatorContainer, 'is-loading');
    },

    _getLastControlButton() {
      let container = this.zoomControl._container,
        index = container.children.length - 1;

      // Find the last visible control button that is not our loading
      // indicator
      while (index > 0) {
        const button = container.children[index];
        if (!(this._indicator === button || button.offsetWidth === 0 || button.offsetHeight === 0)) {
          break;
        }
        index--;
      }

      return container.children[index];
    },

    _handleLoading(e) {
      this.addLoader(this.getEventId(e));
    },

    _handleBaseLayerChange(e) {
      const that = this;

      // Check for a target 'layer' that contains multiple layers, such as
      // L.LayerGroup. This will happen if you have an L.LayerGroup in an
      // L.Control.Layers.
      if (e.layer && e.layer.eachLayer && typeof e.layer.eachLayer === 'function') {
        e.layer.eachLayer((layer) => {
          that._handleBaseLayerChange({ layer });
        });
      } else {
        // If we're changing to a canvas layer, don't handle loading
        // as canvas layers will not fire load events.
        if (!(L.TileLayer.Canvas && e.layer instanceof L.TileLayer.Canvas)) {
          that._handleLoading(e);
        }
      }
    },

    _handleLoad(e) {
      this.removeLoader(this.getEventId(e));
    },

    getEventId(e) {
      if (e.id) {
        return e.id;
      } else if (e.layer) {
        return e.layer._leaflet_id;
      }
      return e.target._leaflet_id;
    },

    _layerAdd(e) {
      if (!e.layer || !e.layer.on) return;
      try {
        e.layer.on({
          ['data:loading']: this._handleLoading,
          ['data:load']: this._handleLoad
        }, this);
      } catch (exception) {
        console.warn('L.Control.Loading: Tried and failed to add ' +
          ' event handlers to layer', e.layer);
        console.warn('L.Control.Loading: Full details', exception);
      }
    },

    _layerRemove(e) {
      if (!e.layer || !e.layer.off) return;
      try {
        e.layer.off({
          loading: this._handleLoading,
          load: this._handleLoad
        }, this);
      } catch (exception) {
        console.warn('L.Control.Loading: Tried and failed to remove ' +
          'event handlers from layer', e.layer);
        console.warn('L.Control.Loading: Full details', exception);
      }
    },

    _addLayerListeners(map) {
      // Add listeners for begin and end of load to any layers already
      // on the map
      map.eachLayer(function (layer) {
        if (!layer.on) return;
        layer.on({
          loading: this._handleLoading,
          load: this._handleLoad
        }, this);
      }, this);

      // When a layer is added to the map, add listeners for begin and
      // end of load
      map.on('layeradd', this._layerAdd, this);
      map.on('layerremove', this._layerRemove, this);
    },

    _removeLayerListeners(map) {
      // Remove listeners for begin and end of load from all layers
      map.eachLayer(function (layer) {
        if (!layer.off) return;
        layer.off({
          loading: this._handleLoading,
          load: this._handleLoad
        }, this);
      }, this);

      // Remove layeradd/layerremove listener from map
      map.off('layeradd', this._layerAdd, this);
      map.off('layerremove', this._layerRemove, this);
    },

    _addMapListeners(map) {
      // Add listeners to the map for (custom) dataloading and dataload
      // events, eg, for AJAX calls that affect the map but will not be
      // reflected in the above layer events.
      map.on({
        baselayerchange: this._handleBaseLayerChange,
        dataloading: this._handleLoading,
        dataload: this._handleLoad,
        layerremove: this._handleLoad
      }, this);
    },

    _removeMapListeners(map) {
      map.off({
        baselayerchange: this._handleBaseLayerChange,
        dataloading: this._handleLoading,
        dataload: this._handleLoad,
        layerremove: this._handleLoad
      }, this);
    }
  });

  L.Map.addInitHook(function () {
    if (this.options.loadingControl) {
      this.loadingControl = new L.Control.Loading();
      this.addControl(this.loadingControl);
    }
  });

  L.Control.loading = function (options) {
    return new L.Control.Loading(options);
  };
};

export default createLoadingIndicatorControl;

