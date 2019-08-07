import React from 'react'
import PropTypes from 'prop-types'

import formatNumber from '../../../shared/services/number-formatter/number-formatter'

import MapDetailResultItem from './MapDetailResultItem'
import MapDetailResultWrapper from './MapDetailResultWrapper'

const MapDetailMeetbout = ({ panoUrl, meetbout, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={meetbout.label}
    title="Meetbout"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Adres" value={meetbout.address} />
      <MapDetailResultItem
        label="Zaksnelheid (mm/j)"
        value={
          meetbout.zakkingssnelheid || meetbout.zakkingssnelheid === 0
            ? `${formatNumber(meetbout.zakkingssnelheid)}`
            : ''
        }
      />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailMeetbout.propTypes = {
  meetbout: PropTypes.shape({
    address: PropTypes.string,
    label: PropTypes.string,
    speed: PropTypes.number,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailMeetbout
