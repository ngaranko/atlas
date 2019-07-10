import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultItem from './MapDetailResultItem'
import MapDetailResultWrapper from './MapDetailResultWrapper'

const MapDetailMonument = ({ panoUrl, monument, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={monument.label}
    title="Monument"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Nummer" value={`${monument.number}`} />
      <MapDetailResultItem label="Type" value={monument.type} />
      <MapDetailResultItem label="Status" value={monument.status} />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailMonument.propTypes = {
  monument: PropTypes.shape({
    label: PropTypes.string,
    number: PropTypes.number,
    status: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailMonument
