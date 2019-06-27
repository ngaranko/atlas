import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultItem, { MapDetailResultUrlItem } from './MapDetailResultItem'
import MapDetailResultWrapper from './MapDetailResultWrapper'

const MapDetailBekendmaking = ({ panoUrl, bekendmaking, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={bekendmaking.label}
    title="Bekendmaking"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Datum" value={bekendmaking.date} />
      <MapDetailResultItem label="Categorie" value={bekendmaking.categorie} />
      <MapDetailResultItem label="Onderwerp" value={bekendmaking.onderwerp} />
      <MapDetailResultItem label="Beschrijving" value={bekendmaking.beschrijving} />
      <MapDetailResultUrlItem
        label="Meer informatie"
        description={bekendmaking.url}
        link={bekendmaking.url}
      />
    </ul>
  </MapDetailResultWrapper>
)

MapDetailBekendmaking.propTypes = {
  panoUrl: PropTypes.string.isRequired,
  bekendmaking: PropTypes.shape({
    label: PropTypes.string,
    categorie: PropTypes.string,
    onderwerp: PropTypes.string,
    beschrijving: PropTypes.string,
    url: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailBekendmaking
