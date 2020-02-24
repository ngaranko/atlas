/* eslint-disable max-len */
/**
 const mapLayers = [
 {
    (X) "id": {String} "Unique identifier for this layer, only required when other layers in group are NOT selectable",
    (X) "layers": {Array} "Layer names as defined in MapServer, only required layer has own MapServer definition",
    (X) "url": {String} "Url to MapServer",
    "params": {Object} "Object containing extra parameters that should be added to the url for MapServer",
    "external": {Boolean} "Should be set to TRUE when the url refers to an external source",
    (*) "title": {String} "Title for group in the MapPanel component",
    (*) "legendItems": [  // Used to define legenda layers that are eithers labels or specific layers with an own MapServer definition. Fields will overwrite the parent object.
      {
        (X) "id": {String} "Unique identifier for this layer, only required layer has own MapServer definition",
        (X) "layers": {Array} "Layer names as defined in MapServer, only required layer has own MapServer definition",
        (X) "url": {String} "Url to MapServer",
        "params": {Object} "Object containing extra parameters that should be added to the url for MapServer",
        "external": {Boolean} "Should be set to TRUE when the url refers to an external source",
        (*) "title": {String} "Title for layer to display, will also be used as label for MapServer",
        "imageRule": {String} "Overrides the label for MapServer",
        "detailUrl": {String} "Relative endpoint for GeoSearch",
        "detailItem": {String} "Identifier for GeoSearch",
        "detailIsShape": {Boolean} "True when GeoSearch is a GeoJSON and not a location point (Default: false)",
      }
    ],
    "disabled": {Boolean} "Hides the legenda for this layer when set to TRUE",
    "bounds": {Array} "Array of a GEO location, only use this when the bounds are predefined",
    "minZoom": {Number} "Can be used to overwrite the default value for MIN_ZOOM in MAP_CONFIG",
    "maxZoom": {Number} "Can be used to overwrite the default value for MAX_ZOOM in MAP_CONFIG",
    "detailUrl": {String} "Relative endpoint for GeoSearch",
    "detailItem": {String} "Identifier for GeoSearch",
    "detailIsShape": {Boolean} "True when GeoSearch is a GeoJSON and not a location point (Default: false)",
    "meta": { // Describes more detailed information about a map layer
      "description": {String} "Detailed description of a map layer"
      "theme": {Number} "Theme ID matching with content type from the CMS"
      "datasetId": {Number} "Dataset ID matching the dataset catalogue"
      "date": {Date} "Date that can be used to sort the map layer"
    }
  }
 ]
 (*) Are required fields
 (X) Are required fields for either the mapLayer objects or legendaItem objects
 */

import MAP_CONFIG from '../map.config'

const mapLayers = require('../../../../public/static/map/map-layers.config.json')
const mapCollections = require('../../../../public/static/map/map-collections.config.json')
const mapThemes = require('../../../../public/static/map/map-themes.config.json')
const mapBaseLayers = require('../../../../public/static/map/map-base-layers.config.json')

export const MAP_LAYER_TYPES = {
  TMS: 'tms',
  WMS: 'wms',
}

// Creates the panel layers as shown in the MapPanel and MapLegend component
const mapPanelLayers = mapCollections.map(mapCollection => {
  return {
    ...mapCollection,
    mapLayers: mapCollection.mapLayers.map(({ id, title }) => {
      const {
        authScope = '',
        category,
        disabled,
        layers = [],
        legendItems,
        maxZoom = MAP_CONFIG.MAX_ZOOM,
        minZoom = MAP_CONFIG.MIN_ZOOM,
        detailUrl,
        iconUrl = '',
        imageRule = '',
        title: mapLayerTitle,
        url,
      } = mapLayers.find(mapLayer => mapLayer.id === id)

      return {
        authScope,
        category: category ? mapThemes[category] : null,
        disabled,
        id,
        layers,
        maxZoom,
        minZoom,
        noDetail: !detailUrl,
        iconUrl,
        imageRule: imageRule || mapLayerTitle,
        title: title || mapLayerTitle,
        url,
        legendItems: legendItems
          ? legendItems.map(legendItem => {
              const legendItemLayer = mapLayers.find(mapLayer => mapLayer.id === legendItem.id)
              const selectable = legendItem.selectable || legendItem.id

              return {
                ...(legendItemLayer || legendItem),
                // The ID of the mapLayer when defined as legendItem, is a combination of the IDs of the mapLayer and the collection it's used in to prevent duplication
                id: selectable ? `${mapCollection.id}-${legendItem.id}` : null,
                selectable,
                noDetail: !legendItem.detailUrl,
              }
            })
          : [],
      }
    }),
  }
})

export { mapBaseLayers, mapPanelLayers }

// Creates the set of map layers that are used to fetch the maps from the server
export default [
  ...mapLayers.map(mapLayer => {
    const { id, type } = mapLayer

    return id
      ? {
          ...mapLayer,
          ...(type ? { type: MAP_LAYER_TYPES[type] } : {}),
        }
      : mapLayer.legendItems.map(legendItem => {
          if (legendItem.id) {
            const legendItemLayer = mapLayers.find(
              ({ id: mapLayerId }) => mapLayerId === legendItem.id,
            )
            return legendItemLayer
          }

          return Object.prototype.hasOwnProperty.call(legendItem, 'id')
            ? {
                ...mapLayer,
                ...(type ? { type: MAP_LAYER_TYPES[type] } : {}),
                ...legendItem,
              }
            : null
        })
  }),
].reduce((acc, val) => acc.concat(val), []) // Alternative to .flat()
/* eslint-enable max-len */
