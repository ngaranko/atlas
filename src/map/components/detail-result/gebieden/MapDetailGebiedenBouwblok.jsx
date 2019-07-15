import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultWrapper from '../MapDetailResultWrapper'

const MapDetailGebiedenBouwblok = ({ panoUrl, bouwblok, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={bouwblok.label}
    title="Bouwblok"
  />
)

MapDetailGebiedenBouwblok.propTypes = {
  bouwblok: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailGebiedenBouwblok
