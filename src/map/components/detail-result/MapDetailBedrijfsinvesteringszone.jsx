import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultItem from './MapDetailResultItem'
import MapDetailResultWrapper from './MapDetailResultWrapper'

const MapDetailBedrijfsinvesteringszone = ({
  panoUrl,
  bedrijfsinvesteringszone,
  onMaximize,
  onPanoPreviewClick,
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={bedrijfsinvesteringszone.label}
    title="Bedrijfsinvesteringszone"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Type" value={bedrijfsinvesteringszone.type} />
      <MapDetailResultItem
        label="Heffingsgrondslag"
        value={bedrijfsinvesteringszone.heffingsgrondslag}
      />
      <MapDetailResultItem
        label="Jaarlijkse heffing"
        value={bedrijfsinvesteringszone.heffingLabel}
      />
      <MapDetailResultItem
        label="Aantal heffingsplichtigen"
        value={bedrijfsinvesteringszone.heffingsplichtigen.toString()}
      />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailBedrijfsinvesteringszone.propTypes = {
  bedrijfsinvesteringszone: PropTypes.shape({
    heffingLabel: PropTypes.string,
    heffingsgrondslag: PropTypes.string,
    heffingsplichtigen: PropTypes.number,
    label: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailBedrijfsinvesteringszone
