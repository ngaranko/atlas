import { routing } from '../app/routes'
import { DATA_SEARCH_REDUCER } from '../shared/ducks/data-search/reducer'
import {
  getActiveFilters,
  getQuery,
  getSort,
  getPage,
  REDUCER_KEY as SEARCH_REDUCER,
} from '../app/pages/SearchPage/SearchPageDucks'
import { getDataSelectionPage, getGeometryFilter } from '../shared/ducks/data-selection/selectors'
import { DATA_SELECTION } from '../shared/ducks/data-selection/reducer'
import { initialState as mapInitialState, REDUCER_KEY as MAP } from '../map/ducks/map/constants'
import {
  initialState as filesInitialState,
  REDUCER_KEY as FILES,
} from '../shared/ducks/files/constants'
import {
  getActiveBaseLayer,
  getCenter,
  getMapOverlays,
  getMapZoom,
  isMapPanelActive,
  getMarkerLocation,
  getMarkerIcon,
} from '../map/ducks/map/selectors'
import { initialState as panoramaInitialState } from '../panorama/ducks/constants'
import { PANORAMA } from '../panorama/ducks/reducer'
import {
  getDetailReference,
  getPageReference,
  getPanoramaHeading,
  getPanoramaLocation,
  getPanoramaPitch,
  getPanoramaTags,
} from '../panorama/ducks/selectors'
import { getDataSearchLocation, getSearchCategory } from '../shared/ducks/data-search/selectors'
import { initialState as dataSelectionInitialState } from '../shared/ducks/data-selection/constants'
import {
  getFiltersWithoutShape,
  initialState as filterInitialState,
  REDUCER_KEY as FILTER,
} from '../shared/ducks/filters/filters'
import {
  getViewMode,
  initialState as UIInitialState,
  isEmbedded,
  isEmbedPreview,
  isPrintMode,
  isMapLinkVisible,
  UI,
} from '../shared/ducks/ui/ui'
import {
  normalizeCoordinate,
  parseLocationString,
} from '../shared/services/coordinate-reference-system'
import PARAMETERS from './parameters'
import paramsRegistry from './params-registry'
import { getFileName } from '../shared/ducks/files/selectors'

const routesWithSearch = [
  routing.search.type,
  routing.dataSearch.type,
  routing.datasetSearch.type,
  routing.articleSearch.type,
  routing.specialSearch.type,
  routing.publicationSearch.type,
]

const routesWithDataSelection = [
  routing.addresses.type,
  routing.cadastralObjects.type,
  routing.establishments.type,
]

const routesWithMapActive = [
  ...routesWithDataSelection,
  routing.data.type,
  routing.panorama.type,
  routing.dataSearchGeo.type,
  routing.dataDetail.type,
]

const routesWithCmsData = [
  routing.articleDetail.type,
  routing.publicationDetail.type,
  routing.specialDetail.type,
]

/* istanbul ignore next */
export default paramsRegistry
  .addParameter(PARAMETERS.QUERY, routes => {
    routes.add(routesWithSearch, SEARCH_REDUCER, 'query', {
      selector: getQuery,
      defaultValue: '',
    })
  })
  .addParameter(PARAMETERS.SORT, routes => {
    routes.add(routesWithSearch, SEARCH_REDUCER, 'sort', {
      selector: getSort,
      defaultValue: '',
    })
  })
  .addParameter(PARAMETERS.PAGE, routes => {
    routes
      .add(routesWithDataSelection, DATA_SELECTION, 'page', {
        defaultValue: dataSelectionInitialState.page,
        selector: getDataSelectionPage,
      })
      .add(routesWithSearch, SEARCH_REDUCER, 'page', {
        selector: getPage,
        defaultValue: 1,
      })
  })
  .addParameter(PARAMETERS.GEO, routes => {
    routes.add(routesWithDataSelection, DATA_SELECTION, 'geometryFilter', {
      selector: getGeometryFilter,
      defaultValue: dataSelectionInitialState.geometryFilter,
      encode: ({ markers, description }) => {
        if (markers && description) {
          return JSON.stringify({
            markers: markers.map(latLong => `${latLong[0]}:${latLong[1]}`).join('|'),
            description,
          })
        }
        return undefined
      },
      decode: geo => {
        let { geometryFilter } = dataSelectionInitialState
        if (geo) {
          const { markers, description } = JSON.parse(geo)
          geometryFilter = {
            markers:
              markers && markers.length
                ? markers.split('|').map(latLng => latLng.split(':').map(str => parseFloat(str)))
                : [],
            description,
          }
        }

        return geometryFilter
      },
    })
  })
  .addParameter(PARAMETERS.VIEW, routes => {
    routes.add(routesWithMapActive, UI, 'viewMode', {
      selector: getViewMode,
      defaultValue: UIInitialState.viewMode,
    })
  })
  .addParameter(PARAMETERS.CATEGORY, routes => {
    routes.add(routing.dataSearch.type, DATA_SEARCH_REDUCER, 'category', {
      defaultValue: dataSelectionInitialState.category,
      selector: getSearchCategory,
    })
  })
  .addParameter(PARAMETERS.VIEW_CENTER, routes => {
    routes.add(
      routesWithMapActive,
      MAP,
      'viewCenter',
      {
        defaultValue: mapInitialState.viewCenter,
        decode: (val = mapInitialState.viewCenter.join(',')) =>
          val.split(',').map(ltLng => normalizeCoordinate(parseFloat(ltLng), 7)),
        encode: selectorResult =>
          selectorResult.map(coordinate => normalizeCoordinate(coordinate, 7)).join(','),
        selector: getCenter,
      },
      false,
    )
  })
  .addParameter(PARAMETERS.ZOOM, routes => {
    routes.add(
      routesWithMapActive,
      MAP,
      'zoom',
      {
        defaultValue: mapInitialState.zoom,
        decode: val => parseFloat(val) || mapInitialState.zoom,
        selector: getMapZoom,
      },
      false,
    )
  })
  .addParameter(PARAMETERS.LEGEND, routes => {
    routes.add(
      routesWithMapActive,
      MAP,
      'mapPanelActive',
      {
        defaultValue: mapInitialState.mapPanelActive,
        selector: isMapPanelActive,
      },
      false,
    )
  })
  .addParameter(PARAMETERS.HEADING, routes => {
    routes.add(
      routing.panorama.type,
      PANORAMA,
      'heading',
      {
        defaultValue: panoramaInitialState.heading,
        selector: getPanoramaHeading,
      },
      false,
    )
  })
  .addParameter(PARAMETERS.MAP_BACKGROUND, routes => {
    routes.add(routesWithMapActive, MAP, 'baseLayer', {
      defaultValue: mapInitialState.baseLayer,
      selector: getActiveBaseLayer,
    })
  })
  .addParameter(PARAMETERS.PANORAMA_TAGS, routes => {
    routes.add(routing.panorama.type, PANORAMA, 'tags', {
      defaultValue: panoramaInitialState.tags,
      selector: getPanoramaTags,
      encode: selectorResult => selectorResult.join(','),
      decode: val => val && val.split(','),
    })
  })
  .addParameter(PARAMETERS.PITCH, routes => {
    routes.add(
      routing.panorama.type,
      PANORAMA,
      'pitch',
      {
        defaultValue: panoramaInitialState.pitch,
        selector: getPanoramaPitch,
      },
      false,
    )
  })
  .addParameter(PARAMETERS.FILE, routes => {
    routes.add(
      routing.constructionFile.type,
      FILES,
      'fileName',
      {
        defaultValue: filesInitialState.fileName,
        selector: getFileName,
      },
      true,
    )
  })
  .addParameter(PARAMETERS.FILTERS, routes => {
    routes
      .add([...routesWithDataSelection], FILTER, 'filters', {
        defaultValue: filterInitialState.filters,
        decode: val => {
          try {
            return JSON.parse(val)
          } catch (e) {
            return filterInitialState.filters
          }
        },
        selector: getFiltersWithoutShape,
        encode: (selectorResult = {}) =>
          Object.keys(selectorResult).length ? JSON.stringify(selectorResult) : undefined,
      })
      .add(routesWithSearch, SEARCH_REDUCER, 'activeFilters', {
        selector: getActiveFilters,
        defaultValue: [],
        decode: val =>
          val
            ? val.split('|').map(encodedFilters => {
                const [type, filters] = encodedFilters.split(';')
                const decodedFilters = filters.split('.')

                return {
                  type,
                  values: decodedFilters,
                }
              })
            : [],
        encode: (selectorResult = {}) =>
          selectorResult
            .map(({ type, values }) => {
              const encodedFilters = Array.isArray(values) ? values.join('.') : values
              return `${type};${encodedFilters}`
            })
            .join('|'),
      })
  })
  .addParameter(PARAMETERS.DETAIL_REFERENCE, routes => {
    routes.add(
      routing.panorama.type,
      PANORAMA,
      'detailReference',
      {
        defaultValue: panoramaInitialState.detailReference,
        decode: val => (val && val.length ? val.split(',') : panoramaInitialState.detailReference),
        selector: getDetailReference,
        encode: selectorResult =>
          selectorResult.length ? selectorResult.join() : panoramaInitialState.detailReference,
      },
      false,
    )
  })
  .addParameter(PARAMETERS.PAGE_REFERENCE, routes => {
    routes.add(
      routing.panorama.type,
      PANORAMA,
      'pageReference',
      {
        defaultValue: panoramaInitialState.pageReference,
        selector: getPageReference,
      },
      false,
    )
  })
  .addParameter(PARAMETERS.EMBED_PREVIEW, routes => {
    routes.add(routesWithMapActive, UI, 'isEmbedPreview', {
      defaultValue: UIInitialState.isEmbedPreview,
      selector: isEmbedPreview,
    })
  })
  .addParameter(PARAMETERS.EMBED, routes => {
    routes.add(routesWithMapActive, UI, 'isEmbed', {
      defaultValue: UIInitialState.isEmbed,
      selector: isEmbedded,
    })
  })
  .addParameter(PARAMETERS.PRINT, routes => {
    routes.add(
      [
        ...routesWithMapActive,
        ...routesWithSearch,
        ...routesWithCmsData,
        routing.datasetDetail.type,
      ],
      UI,
      'isPrintMode',
      {
        defaultValue: UIInitialState.isPrintMode,
        selector: isPrintMode,
      },
    )
  })
  .addParameter(PARAMETERS.LAYERS, routes => {
    routes.add(
      [...routesWithMapActive, ...routesWithSearch],
      MAP,
      'overlays',
      {
        defaultValue: mapInitialState.overlays,
        decode: val =>
          val
            ? val.split('|').map(obj => {
                const layerInfo = obj.split(':')
                return {
                  id: layerInfo[0],
                  isVisible: !!parseInt(layerInfo[1], 0),
                }
              })
            : mapInitialState.overlays,
        selector: getMapOverlays,
        encode: selectorResult =>
          selectorResult.map(overlay => `${overlay.id}:${overlay.isVisible ? 1 : 0}`).join('|'),
      },
      false,
    )
  })
  .addParameter(PARAMETERS.LOCATION, routes => {
    routes
      .add(
        routing.panorama.type,
        PANORAMA,
        'location',
        {
          decode: val =>
            val ? val.split(',').map(string => parseFloat(string)) : panoramaInitialState.location,
          defaultValue: panoramaInitialState.location,
          selector: getPanoramaLocation,
          encode: selectorResult =>
            selectorResult ? selectorResult.join() : panoramaInitialState.location,
        },
        false,
      )
      .add(routing.dataSearchGeo.type, DATA_SEARCH_REDUCER, 'geoSearch', {
        defaultValue: null,
        selector: getDataSearchLocation,
        encode: selectorResult => {
          if (selectorResult && selectorResult.latitude) {
            return `${selectorResult.latitude},${selectorResult.longitude}`
          }
          if (Array.isArray(selectorResult)) {
            return selectorResult.join()
          }
          return undefined
        },
        decode: val => {
          if (val) {
            const latLngObj = parseLocationString(val)
            return {
              latitude: latLngObj.lat,
              longitude: latLngObj.lng,
            }
          }
          return null
        },
      })
  })
  .addParameter(PARAMETERS.MARKER, routes => {
    routes.add(
      routesWithMapActive,
      MAP,
      'marker',
      {
        defaultValue: mapInitialState.marker,
        decode: val =>
          val && val.split(',').map(ltLng => normalizeCoordinate(parseFloat(ltLng), 7)),
        encode: value => value && value.position.join(','),
        selector: getMarkerLocation,
      },
      false,
    )
  })
  .addParameter(PARAMETERS.MARKER_ICON, routes => {
    routes.add(
      routesWithMapActive,
      MAP,
      'markerIcon',
      {
        defaultValue: mapInitialState.markerIcon,
        selector: getMarkerIcon,
      },
      false,
    )
  })
  .addParameter(PARAMETERS.MAP_LINK, routes => {
    routes.add(
      routesWithMapActive,
      UI,
      'isMapLinkVisible',
      {
        defaultValue: UIInitialState.isMapLinkVisible,
        selector: isMapLinkVisible,
      },
      true,
    )
  })
