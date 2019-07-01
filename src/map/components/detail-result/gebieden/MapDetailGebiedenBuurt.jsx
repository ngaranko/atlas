import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultWrapper from '../MapDetailResultWrapper'
import MapDetailResultItem from '../MapDetailResultItem'

const MapDetailGebiedenBuurt = ({ panoUrl, buurt, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={buurt.label}
    title="Buurt"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Volledige code" value={buurt.volledigeCode} />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailGebiedenBuurt.propTypes = {
  buurt: PropTypes.shape({
    label: PropTypes.string.isRequired,
    volledigeCode: PropTypes.string,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailGebiedenBuurt
