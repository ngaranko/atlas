import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultWrapper from './MapDetailResultWrapper'

const MapDetailVastgoed = ({ panoUrl, vastgoed, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={vastgoed.label}
    title="Winkelgebied"
  >
    <React.Fragment>
    </React.Fragment>
  </MapDetailResultWrapper>
)

MapDetailVastgoed.propTypes = {
  panoUrl: PropTypes.string.isRequired,
  vastgoed: PropTypes.shape({}).isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailVastgoed
