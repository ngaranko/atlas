import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultWrapper from '../MapDetailResultWrapper'
import MapDetailResultItem from '../MapDetailResultItem'

const MapDetailGebiedenWijk = ({ panoUrl, wijk, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={wijk.label}
    title="Wijk"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Volledige code" value={wijk.volledigeCode} />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailGebiedenWijk.propTypes = {
  wijk: PropTypes.shape({
    label: PropTypes.string.isRequired,
    volledigeCode: PropTypes.string,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailGebiedenWijk
