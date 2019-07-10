import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultItem from '../MapDetailResultItem'
import MapDetailResultWrapper from '../MapDetailResultWrapper'

const MapDetailAdressenOpenbareRuimte = ({
  panoUrl,
  openbareRuimte,
  onMaximize,
  onPanoPreviewClick,
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={openbareRuimte.label}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    title={openbareRuimte.type}
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Naam 24-posities (NEN)" value={openbareRuimte.nenName} />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailAdressenOpenbareRuimte.propTypes = {
  openbareRuimte: PropTypes.shape({
    label: PropTypes.string,
    nenName: PropTypes.string,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailAdressenOpenbareRuimte
