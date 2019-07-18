import PropTypes from 'prop-types'
import React from 'react'
import MapDetailResultWrapper from './MapDetailResultWrapper'
import MapDetailResultItem from './MapDetailResultItem'

const MapDetailVastgoed = ({ panoUrl, item, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={item.label}
    title="Gemeentelijk eigendom"
  >
    <React.Fragment>
      <MapDetailResultItem label="Bouwjaar" value={item.construction_year} />
      <MapDetailResultItem label="Status" value={item.status} />
    </React.Fragment>
  </MapDetailResultWrapper>
)

MapDetailVastgoed.propTypes = {
  panoUrl: PropTypes.string.isRequired,
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    construction_year: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailVastgoed
