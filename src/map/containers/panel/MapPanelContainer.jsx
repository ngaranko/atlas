import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getPanelLayers, selectActivePanelLayers } from '../../ducks/panel-layers/map-panel-layers'
import { getBaseLayers } from '../../ducks/base-layers/map-base-layers'
import {
  isMapPanelHandleVisible,
  isPrintMode,
  toggleMapPanelHandle,
} from '../../../shared/ducks/ui/ui'
import MapPanel from './MapPanel'
import {
  setMapBaseLayer,
  toggleMapOverlay,
  toggleMapOverlayVisibility,
  toggleMapPanel,
} from '../../ducks/map/actions'
import {
  getActiveBaseLayer,
  getMapOverlays,
  getMapZoom,
  isMapPanelActive,
} from '../../ducks/map/selectors'
import { getUser } from '../../../shared/ducks/user/user'

const mapStateToProps = state => ({
  activeBaseLayer: getActiveBaseLayer(state),
  activeMapLayers: selectActivePanelLayers(state),
  isMapPanelHandleVisible: !state.map.overlays.length || isMapPanelHandleVisible(state),
  mapBaseLayers: getBaseLayers(state),
  panelLayers: getPanelLayers(state),
  overlays: getMapOverlays(state),
  zoomLevel: getMapZoom(state),
  user: getUser(state),
  printMode: isPrintMode(state),
  isMapPanelVisible: isMapPanelActive(state),
})

// TODO: Add method that checks whether layer is active and toggles accordingly
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onBaseLayerToggle: setMapBaseLayer,
      onLayerToggle: toggleMapOverlay,
      onLayerVisibilityToggle: toggleMapOverlayVisibility,
      onMapPanelHandleToggle: toggleMapPanelHandle,
      onMapPanelToggle: toggleMapPanel,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(MapPanel)
