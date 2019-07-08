import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultItem from './MapDetailResultItem'
import MapDetailResultWrapper from './MapDetailResultWrapper'

const MapDetailParkeerzone = ({ panoUrl, parkeerzone, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={parkeerzone.label}
    title="Parkeerzone"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Omschrijving" value={parkeerzone.description} />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailParkeerzone.propTypes = {
  panoUrl: PropTypes.string.isRequired,
  parkeerzone: PropTypes.shape({}).isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailParkeerzone
