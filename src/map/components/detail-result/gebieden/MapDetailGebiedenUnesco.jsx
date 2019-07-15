import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultWrapper from '../MapDetailResultWrapper'

const MapDetailGebiedenUnesco = ({ panoUrl, unesco, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={unesco.label}
    title="UNESCO"
  />
)

MapDetailGebiedenUnesco.propTypes = {
  unesco: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailGebiedenUnesco
