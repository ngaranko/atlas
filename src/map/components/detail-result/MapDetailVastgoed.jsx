import PropTypes from 'prop-types'
import React from 'react'
import MapDetailResultWrapper from './MapDetailResultWrapper'
import MapDetailResultItem from './MapDetailResultItem'

const MapDetailVastgoed = ({ panoUrl, vastgoed, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={vastgoed.label}
    title="Gemeentelijk Vastgoed"
  >
    <React.Fragment>
      <MapDetailResultItem label="Bouwjaar" value={vastgoed.construction_year} />
      <MapDetailResultItem label="Status" value={vastgoed.status} />
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
