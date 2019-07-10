import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultWrapper from '../MapDetailResultWrapper'
import MapDetailResultItem from '../MapDetailResultItem'

const MapDetailGebiedenGebiedsgerichtWerken = ({
  panoUrl,
  gebiedsgerichtWerken,
  onMaximize,
  onPanoPreviewClick,
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={gebiedsgerichtWerken.label}
    title="Gebiedsgerichtwerken-gebied"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Code" value={gebiedsgerichtWerken.code} />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailGebiedenGebiedsgerichtWerken.propTypes = {
  gebiedsgerichtWerken: PropTypes.shape({
    label: PropTypes.string.isRequired,
    code: PropTypes.string,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailGebiedenGebiedsgerichtWerken
