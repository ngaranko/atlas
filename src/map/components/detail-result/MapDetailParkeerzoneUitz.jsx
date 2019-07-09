import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultItem from './MapDetailResultItem'
import MapDetailResultWrapper from './MapDetailResultWrapper'

const MapDetailParkeerzone = ({ panoUrl, item, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={item.label}
    title="Uitzondering parkeervergunninggebied"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Omschrijving" value={item.description} />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailParkeerzone.propTypes = {
  panoUrl: PropTypes.string.isRequired,
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailParkeerzone
